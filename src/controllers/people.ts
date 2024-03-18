import { RequestHandler } from "express";
import * as people from "../services/people";

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
