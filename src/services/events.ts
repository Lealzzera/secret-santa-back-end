import { PrismaClient, Prisma } from "@prisma/client";

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
