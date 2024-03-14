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
