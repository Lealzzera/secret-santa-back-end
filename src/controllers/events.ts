import { RequestHandler } from "express";
import * as events from "../services/events";
import { z } from "zod";

export const getAll: RequestHandler = async (req, res) => {
	const items = await events.getAll();
	if (items) {
		return res.json({ events: items });
	} else {
		return res.json({ error: "Ocorreu um erro" });
	}
};

export const getEvent: RequestHandler = async (req, res) => {
	const { id } = req.params;
	const eventItem = await events.getEventById(+id);
	if (eventItem) {
		return res.json({ event: eventItem });
	} else {
		return res.json({ error: "Não foi encontrado nenhum evento" });
	}
};

export const createEvent: RequestHandler = async (req, res) => {
	const createEventSchema = z.object({
		title: z.string(),
		description: z.string(),
		grouped: z.boolean(),
	});

	const body = createEventSchema.safeParse(req.body);
	if (!body.success) {
		return res.json({ error: "Erro ao criar o evento, dados inválidos" });
	} else {
		const newEvent = await events.createEvent(body.data);
		if (newEvent) {
			return res
				.status(210)
				.json({ success: "Evento criado com sucesso", event: newEvent });
		} else {
			res.json({ error: "Ocorreu um erro" });
		}
	}
};

type EventUpdated = {
	id: number;
	status?: boolean;
	title?: string;
	description?: string;
	grouped?: boolean;
};

export const updateEvent: RequestHandler = async (req, res) => {
	const { id } = req.params;
	const updateEventSchema = z.object({
		status: z.boolean().optional(),
		title: z.string().optional(),
		description: z.string().optional(),
		grouped: z.boolean().optional(),
	});
	const body = updateEventSchema.safeParse(req.body);
	if (!body.success) return res.json({ error: "Dados inválidos" });

	const updatedEvent = (await events.updateEvent(
		parseInt(id),
		body.data
	)) as EventUpdated;
	if (updatedEvent) {
		if (updatedEvent.status) {
			//TODO: FAZER O SORTEIO
		} else {
			//TODO: Limpar o sorteio
		}
		return res.json({
			success: "Dados alterados com sucesso",
			event: updatedEvent,
		});
	} else {
		return res.json({
			error: `Ocorreu um erro ao atualizar o evento id: ${id}`,
		});
	}
};

export const deleteEvent: RequestHandler = async (req, res) => {
	const { id } = req.params;
	const deletedEvent = await events.deleteEventById(+id);
	if (deletedEvent) {
		return res.json({
			success: "Evento excluído com sucesso!",
			event: deletedEvent,
		});
	} else {
		res.json({ error: `Ocorreu um erro ao deletar o evento id: ${id}` });
	}
};
