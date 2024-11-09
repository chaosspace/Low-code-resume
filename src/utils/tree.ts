import { createElement, ReactNode } from "react";
import { IWorkTreeNode } from "@/store";
// import { generateUniqueHash } from "./index";

export const setupTree = (root: IWorkTreeNode, utils: any): ReactNode => {
	const handleNodeClick = () => {
		utils.setWorkingComp({ type: root.type, id: root.id });
	};

	const props = {
		className: `${utils.workingCompId === root.id ? "node-selected" : ""}`,
		onClick: handleNodeClick,
		...root.data,
	};

	return createElement("div", props, [
		root.id,
		...root.children.map((node) => setupTree(node, utils)),
	]);
};

export const createNode = (name: string): IWorkTreeNode => {
	return {
		type: name,
		id: "1",
	} as IWorkTreeNode;
};
