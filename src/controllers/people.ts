import { RequestHandler } from "express";
import * as people from "../services/people";
import { z } from "zod";

export const getAll: RequestHandler = async (req, res) => {
	const { id_event } = req.params;
	const peopleFound = await people.getAllPeopleService(+id_event);
	if (peopleFound) {
		return res.json({ people: peopleFound });
	} else {
		return res.json({ error: "Ocorreu um erro ao encontrar as pessoas" });
	}
};

export const getAllPeopleByGroup: RequestHandler = async (req, res) => {
	const { id_event, id_group } = req.params;
	const peopleFound = await people.getAllPeopleByGroupService(
		+id_event,
		+id_group
	);
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

export const updatePerson: RequestHandler = async (req, res) => {
	const { id_event, id_group, id } = req.params;
	const updatePersonSchema = z.object({
		name: z.string().optional(),
		cpf: z
			.string()
			.transform((val) => val.replace(/\.|-/gm, ""))
			.optional(),
		matched: z.string().optional(),
	});
	const body = updatePersonSchema.safeParse(req.body);
	if (!body.success) {
		return res.json({ error: "Dados inválidos" });
	} else {
		const updatedPerson = await people.updatePersonService(
			{
				id_event: +id_event,
				id_group: +id_group,
				id: +id,
			},
			body.data
		);
		if (updatedPerson) {
			const personItem = await people.getPersonService({
				idEvent: +id_event,
				idGroup: +id_group,
				id: +id,
			});
			return res.json({
				success: "Usuário alterado com sucesso",
				person: personItem,
			});
		} else {
			return res.json({ error: "Ocorreu um erro ao atualizar o usuário." });
		}
	}
};

export const deletePerson: RequestHandler = async (req, res) => {
	const { id_event, id_group, id } = req.params;
	const deletedPerson = await people.deletePersonService({
		id_event: +id_event,
		id_group: +id_group,
		id: +id,
	});
	if (deletedPerson) {
		return res.json({
			success: "Pessoa deletada com sucesso",
			person: deletedPerson,
		});
	} else {
		return res.json({ error: "Ocorreu um erro ao deletar este usuário" });
	}
};
