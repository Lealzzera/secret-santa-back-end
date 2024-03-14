import { RequestHandler } from "express";
import * as groups from "../services/groups";

export const getAll: RequestHandler = async (req, res) => {
	const { id_event } = req.params;
	console.log(await groups.getAllGroups(+id_event));
};
