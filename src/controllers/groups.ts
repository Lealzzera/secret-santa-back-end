import { RequestHandler } from "express";
import * as groups from "../services/groups";

export const getAll: RequestHandler = async (req, res) => {
	const { id_event } = req.params;
	const allGroups = await groups.getAllGroups(+id_event);
	if (allGroups) return res.json({ groups: [allGroups] });
	return res.json({ error: "Ocorreu um erro ao puxar os grupos" });
};
