import { Card } from "./card";
export { Card } from "./card";
import { Row } from "./row";
export { Row } from "./row";

export const MaterialConfig = [
	{ name: "Card", component: Card },
	{ name: "Row", component: Row },
];

export const AddableCompMap = {
	WorkSpace: ["Row", "Span"],
	Card: ["Row", "Span"],
	Row: ["Text", "Span"],
	Span: ["Text"],
};
