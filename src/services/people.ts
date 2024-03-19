import { PrismaClient, Prisma } from "@prisma/client";
import * as events from "./events";
import * as groups from "./groups";

const prisma = new PrismaClient();

export const getAllPeopleService = async (idEvent: number) => {
	try {
		const peopleFound = await prisma.eventPeople.findMany({
			where: {
				id_event: idEvent,
			},
		});
		return peopleFound;
	} catch (err) {
		return { err };
	}
};

export const getAllPeopleByGroupService = async (
	idEvent: number,
	idGroup: number
) => {
	try {
		const peopleFound = await prisma.eventPeople.findMany({
			where: {
				id_event: idEvent,
				id_group: idGroup,
			},
		});
		return peopleFound;
	} catch (err) {
		return { err };
	}
};

type GetPersonServiceFilters = {
	idEvent: number;
	idGroup?: number;
	id?: number;
	cpf?: string;
};
export const getPersonService = async (filters: GetPersonServiceFilters) => {
	try {
		if (!filters.id && !filters.cpf) {
			return false;
		} else {
			const personFound = await prisma.eventPeople.findFirst({
				where: {
					id_event: filters.idEvent,
					id_group: filters.idGroup,
					id: filters.id,
					cpf: filters.cpf,
				},
			});
			return personFound;
		}
	} catch (err) {
		return { err };
	}
};

type PersonCreateData = Prisma.Args<
	typeof prisma.eventPeople,
	"create"
>["data"];

export const addPersonService = async (data: PersonCreateData) => {
	try {
		if (!data.id_event && !data.id_group) {
			return false;
		} else {
			const event = await events.getEventById(data.id_event);
			const group = await groups.getOneGroup({
				id: data.id_group,
				id_event: data.id_event,
			});
			if (!event && !group) {
				return false;
			} else {
				return await prisma.eventPeople.create({ data });
			}
		}
	} catch (err) {
		return { err };
	}
};

type PeopleUpdateData = Prisma.Args<
	typeof prisma.eventPeople,
	"update"
>["data"];

type UpdateFilters = {
	id_event: number;
	id_group?: number;
	id?: number;
};

export const updatePersonService = async (
	filters: UpdateFilters,
	data: PeopleUpdateData
) => {
	try {
		return await prisma.eventPeople.updateMany({ where: filters, data });
	} catch (err) {
		return { err };
	}
};

type DeleteFilters = { id_event?: number; id_group?: number; id: number };
export const deletePersonService = async (filters: DeleteFilters) => {
	try {
		return await prisma.eventPeople.delete({ where: filters });
	} catch (err) {
		return { err };
	}
};
