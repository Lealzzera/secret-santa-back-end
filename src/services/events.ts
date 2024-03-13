import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAll = async () => {
	try {
		return await prisma.event.findMany();
	} catch (err) {
		return false;
	}
};

export const getEventById = async (id: number) => {
	try {
		return await prisma.event.findFirst({ where: { id } });
	} catch (err) {
		return err;
	}
};
