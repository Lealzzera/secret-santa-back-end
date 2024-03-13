import { Router } from "express";

const router = Router();

router.get("/ping", (req, res) => {
	return res.json({ pong: true });
});

export default router;
