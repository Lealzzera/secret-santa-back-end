import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllGroups = async (id: number) => {
	const groups = await prisma.eventGroup.findMany({
		where: {
			id_event: id,
		},
	});
	return groups;
};
