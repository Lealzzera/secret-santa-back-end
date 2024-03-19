import { PrismaClient, Prisma } from "@prisma/client";
import * as people from "./people";
import * as groups from "./groups";
import { People } from "../types/people";
import { encryptMatch } from "../utils/match";

const prisma = new PrismaClient();

export const getAll = async () => {
	try {
		return await prisma.event.findMany();
	} catch (err) {
		return err;
	}
};

export const getEventById = async (id: number) => {
	try {
		return await prisma.event.findFirst({ where: { id } });
	} catch (err) {
		return err;
	}
};

type EventsCreateData = Prisma.Args<typeof prisma.event, "create">["data"];
export const createEvent = async (data: EventsCreateData) => {
	try {
		const event = await prisma.event.create({ data });
		return event;
	} catch (err) {
		return err;
	}
};
type EventsUpdateData = Prisma.Args<typeof prisma.event, "update">["data"];
export const updateEvent = async (id: number, data: EventsUpdateData) => {
	try {
		return await prisma.event.update({ where: { id }, data });
	} catch (err) {
		return err;
	}
};

export const deleteEventById = async (id: number) => {
	try {
		const event = await prisma.event.delete({ where: { id } });
		return event;
	} catch (err) {
		return err;
	}
};

export const matchesDraw = async (id: number): Promise<boolean> => {
	const eventItem = await prisma.event.findFirst({
		where: { id },
		select: { grouped: true },
	});

	if (eventItem) {
		const peopleList = (await people.getAllPeopleService(id)) as People[];
		if (peopleList) {
			let sortedList: { id: number; match: number }[] = [];
			let sortable: number[] = [];

			let attempts = 0;
			let maxAttempts = peopleList.length;
			let keepTrying = true;
			while (keepTrying && attempts < maxAttempts) {
				attempts++;
				keepTrying = false;
				sortedList = [];
				sortable = peopleList.map((item) => item.id);

				for (let i in peopleList) {
					let sortableFiltered: number[] = sortable;
					if (eventItem.grouped) {
						sortableFiltered = sortable.filter((sortableItem) => {
							let sortablePerson = peopleList.find(
								(item) => item.id === sortableItem
							);
							return peopleList[i].id_group !== sortablePerson?.id_group;
						});
					}

					if (
						sortableFiltered.length === 0 ||
						(sortableFiltered.length === 1 &&
							peopleList[i].id === sortableFiltered[0])
					) {
						keepTrying = true;
					} else {
						let sortedIndex = Math.floor(
							Math.random() * sortableFiltered.length
						);
						while (sortableFiltered[sortedIndex] === peopleList[i].id) {
							sortedIndex = Math.floor(Math.random() * sortableFiltered.length);
						}
						sortedList.push({
							id: peopleList[i].id,
							match: sortableFiltered[sortedIndex],
						});
						sortable = sortable.filter(
							(item) => item !== sortableFiltered[sortedIndex]
						);
					}
				}
			}
			if (attempts < maxAttempts) {
				for (let i in sortedList) {
					await people.updatePersonService(
						{ id: sortedList[i].id, id_event: id },
						{ matched: encryptMatch(sortedList[i].match) }
					);
				}
				return true;
			}
		}
	}

	return false;
};
