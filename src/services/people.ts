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
