import { getToday } from "../utils/getToday";

export const validatePassword = (password: string): any => {
	const currentPassword = getToday().split("/").join("");
	return password === currentPassword;
};

export const createToken = () => {
	const currentPassword = getToday().split("/").join("");
	return `${process.env.DEFAULT_TOKEN}${currentPassword}${process.env.DEFAULT_TOKEN}`;
};

export const validateToken = (token: string) => {
	const currentToken = createToken();
	return token === currentToken;
};
