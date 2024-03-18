import { PrismaClient, Prisma } from "@prisma/client";
import * as events from "./events";

const prisma = new PrismaClient();

export const getAllGroups = async (idEvent: number) => {
	try {
		const groups = await prisma.eventGroup.findMany({
			where: {
				id_event: idEvent,
			},
		});
		return groups;
	} catch (err) {
		return err;
	}
};

type GetOneGroupFilters = { id: number; id_event?: number };
export const getOneGroup = async (filters: GetOneGroupFilters) => {
	try {
		return await prisma.eventGroup.findFirst({
			where: filters,
		});
	} catch (err) {
		return err;
	}
};

type GroupsCreateData = Prisma.Args<typeof prisma.eventGroup, "create">["data"];
export const addGroup = async (data: GroupsCreateData) => {
	try {
		if (!data.id_event) {
			return false;
		} else {
			const eventItem = await events.getEventById(data.id_event);
			if (!eventItem) {
				return false;
			} else {
				console.log({ data });
				return await prisma.eventGroup.create({ data });
			}
		}
	} catch (err) {
		return { error: "Deu error no catch", err };
	}
};

type UpdateFilters = { id: number; id_event?: number };
type GroupsUpdateData = Prisma.Args<typeof prisma.eventGroup, "update">["data"];
export const updateGroupService = async (
	filters: UpdateFilters,
	data: GroupsUpdateData
) => {
	try {
		return await prisma.eventGroup.update({
			where: filters,
			data,
		});
	} catch (err) {
		return err;
	}
};

export const deleteGroupService = async (idEvent: number, idGroup: number) => {
	try {
		return await prisma.eventGroup.delete({
			where: {
				id_event: idEvent,
				id: idGroup,
			},
		});
	} catch (err) {
		return { err };
	}
};
