import { createElement, Fragment, ReactNode } from "react";
import { IWorkTreeNode } from "@/store";
import { generateUniqueId } from ".";
import { TMaterialType } from "@/material";
import styles from "../layouts/sidepane/sidePane.module.less";

export const setupTree = (
	root: IWorkTreeNode,
	utils: any,
	layer = 0
): ReactNode => {
	const props = {
		key: root.id,
		style: { marginLeft: `${layer}em` },
		className: `${
			utils.workingCompId === root.id ? styles["node-selected"] : ""
		}`,
		onClick: () => utils.handleWorkingNodeChange(root),
		...root.data,
	};

	const nodeChildren =
		root.id !== "Workspace"
			? [
					createElement(
						"div",
						{
							key: `${root.id}-delete`,
							className: styles["node-delete"],
							onClick: (e) => {
								e.stopPropagation();
								utils.handleTreeNodeDelete(root.id);
							},
						},
						["×"]
					),
			  ]
			: [];

	return createElement(Fragment, { key: generateUniqueId() }, [
		createElement("div", props, [root.type], nodeChildren),
		...root.children.map((node) => setupTree(node, utils, layer + 1)),
	]);
};

export const createNode = (name: TMaterialType, data: any): IWorkTreeNode => {
	return {
		type: name,
		id: generateUniqueId(),
		children: [],
		sibling: null,
		data,
	};
};

export const findTreeNodeById = (
	node: IWorkTreeNode,
	id: string
): IWorkTreeNode | null => {
	let final = null;
	if (node.id === id) {
		final = node;
	} else {
		for (const n of node.children) {
			const t = findTreeNodeById(n, id);
			if (t) {
				final = t;
				break;
			}
		}
	}
	return final;
};

export const findTreeNodeBySubId = (
	node: IWorkTreeNode,
	id: string
): [IWorkTreeNode, number] | null => {
	for (let idx = 0; idx < node.children.length; idx += 1) {
		const sub = node.children[idx];

		if (sub.id === id) {
			return [node, idx];
		}

		const resultOfSub = findTreeNodeBySubId(sub, id);
		if (resultOfSub) {
			return resultOfSub;
		}
	}

	return null;
};
