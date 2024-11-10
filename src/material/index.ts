import { ReactNode } from "react";
import { Card } from "./card";
export { Card } from "./card";
import { Row } from "./row";
export { Row } from "./row";
import { Span } from "./span";
export { Span } from "./span";

export const MaterialConfig: {
	name: TMaterialType;
	component: () => ReactNode;
}[] = [
	{ name: "Card", component: Card },
	{ name: "Row", component: Row },
	{ name: "Span", component: Span },
];

export const AddableCompMap = {
	WorkSpace: ["Row", "Span"],
	Card: ["Row", "Span"],
	Row: ["Text", "Span"],
	Span: ["Text"],
};

export type TMaterialType = "Workspace" | "Card" | "Row" | "Span" | "Text";
