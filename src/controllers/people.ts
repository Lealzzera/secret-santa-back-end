import { RequestHandler } from "express";
import * as people from "../services/people";

export const getAll: RequestHandler = async (req, res) => {
	const { id_event, id_group } = req.params;
	const peopleFound = await people.getAllPeopleService(+id_event, +id_group);
	if (peopleFound) {
		return res.json(peopleFound);
	} else {
		return res.json({ error: "Ocorreu um erro ao encontrar as pessoas" });
	}
};
