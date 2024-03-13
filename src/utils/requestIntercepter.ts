import { RequestHandler } from "express";

export const requestIntercepter: RequestHandler = (req, res, next) => {
	console.log(
		`-> REQUEST METHOD: ${req.method} | REQUEST URL ${
			req.originalUrl
		} | REQUEST BODY ${JSON.stringify(req.body)}`
	);
	next();
};
