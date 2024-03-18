import { RequestHandler } from "express";
import * as groups from "../services/groups";
import { z } from "zod";

export const getAll: RequestHandler = async (req, res) => {
	const { id_event } = req.params;
	const allGroups = await groups.getAllGroups(+id_event);
	if (allGroups) {
		return res.json({ groups: [allGroups] });
	} else {
		return res.json({ error: "Ocorreu um erro ao puxar os grupos" });
	}
};

export const getGroup: RequestHandler = async (req, res) => {
	const { id, id_event } = req.params;
	const groupItem = await groups.getOneGroup({ id: +id, id_event: +id_event });
	if (groupItem) {
		return res.json({ group: groupItem });
	} else {
		return res.json({ error: "Ocorreu um erro" });
	}
};

export const addGroup: RequestHandler = async (req, res) => {
	const { id_event } = req.params;
	const addGroupSchema = z.object({
		name: z.string(),
	});
	const body = addGroupSchema.safeParse(req.body);
	if (!body.success) {
		return res.json({ error: "Dados Inválidos" });
	} else {
		const newGroup = await groups.addGroup({
			...body.data,
			id_event: +id_event,
		});
		if (newGroup) {
			return res
				.status(201)
				.json({ success: "Grupo criado com sucesso", group: newGroup });
		} else {
			return res.json({ error: "Ocorreu um erro ao criar o grupo" });
		}
	}
};

export const updateGroup: RequestHandler = async (req, res) => {
	const { id_event, id } = req.params;
	const updateGroupSchema = z.object({
		name: z.string().optional(),
	});
	const body = updateGroupSchema.safeParse(req.body);
	if (!body.success) {
		res.json({ error: "Ocorreu um erro ao atualizar o nome do grupo" });
	} else {
		const updatedGroup = await groups.updateGroupService(
			{
				id: +id,
				id_event: +id_event,
			},
			body.data
		);
		if (updatedGroup) {
			return res.json({
				success: "Grupo alterado com sucesso",
				group: updatedGroup,
			});
		} else {
			return res.json({ error: "Ocorreu um erro para alterar o grupo" });
		}
	}
};

type GroupDeleted = {
	id: number;
	id_event: number;
	name: string;
};

export const deleteGroup: RequestHandler = async (req, res) => {
	const { id_event, id } = req.params;
	const groupDeleted = (await groups.deleteGroupService(
		+id_event,
		+id
	)) as GroupDeleted;
	if (groupDeleted.name) {
		return res.json({
			success: "Grupo excluído com sucesso",
			group: groupDeleted,
		});
	} else {
		return res.json({ error: "Ocorreu um erro ao deletar o grupo" });
	}
};
