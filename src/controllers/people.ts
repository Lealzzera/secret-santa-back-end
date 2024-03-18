import { RequestHandler } from "express";
import * as people from "../services/people";
import { z } from "zod";

export const getAll: RequestHandler = async (req, res) => {
	const { id_event, id_group } = req.params;
	const peopleFound = await people.getAllPeopleService(+id_event, +id_group);
	if (peopleFound) {
		return res.json({ people: peopleFound });
	} else {
		return res.json({ error: "Ocorreu um erro ao encontrar as pessoas" });
	}
};

export const getPerson: RequestHandler = async (req, res) => {
	const { id_event, id_group, id } = req.params;
	const personFound = await people.getPersonService({
		idEvent: +id_event,
		idGroup: +id_group,
		id: +id,
	});
	if (personFound) {
		return res.json({ success: "Pessoa encontrada", person: personFound });
	} else {
		return res.json({ error: "Pessoa não encontrada." });
	}
};

export const addPerson: RequestHandler = async (req, res) => {
	const { id_event, id_group } = req.params;
	const addPeopleSchema = z.object({
		name: z.string(),
		cpf: z.string().transform((val) => val.replace(/\.|-/gm, "")),
		matched: z.string().optional(),
	});
	const body = addPeopleSchema.safeParse(req.body);
	if (!body.success) {
		return res.json({ error: "Dados Inválidos" });
	} else {
		const newPerson = await people.addPersonService({
			...body.data,
			id_event: +id_event,
			id_group: +id_group,
		});
		if (newPerson) {
			return res
				.status(201)
				.json({ success: "Usuário cadastrado com sucesso", user: newPerson });
		} else {
			return res.json({ error: "Ocorreu um erro ao cadastrar o usuário" });
		}
	}
};
