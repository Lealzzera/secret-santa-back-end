import { PrismaClient, Prisma } from "@prisma/client";

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
