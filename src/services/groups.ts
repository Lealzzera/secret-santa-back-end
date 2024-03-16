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
				return await prisma.eventGroup.create({ data });
			}
		}
	} catch (err) {
		return err;
	}
};
