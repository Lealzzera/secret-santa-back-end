import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllPeopleService = async (idEvent: number, idGroup: number) => {
	try {
		const peopleFound = await prisma.eventPeople.findMany({
			where: {
				id_group: idGroup,
				id_event: idEvent,
			},
		});
		return peopleFound;
	} catch (err) {
		return { err };
	}
};
