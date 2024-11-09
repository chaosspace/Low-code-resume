import { useSyncExternalStore } from "react";
import { create } from "zustand";
import { TMaterialType } from "@/material";

interface IBaseCompData {
	type: string;
	id: string;
}

interface IWorkingStore extends IBaseCompData {}

interface IWorkingStoreActions {
	setWorkingComp(newComp: IBaseCompData): void;
}

export const useWorkingStore = create<IWorkingStore & IWorkingStoreActions>(
	(set) => ({
		type: "Workspace",
		id: "Workspace",
		setWorkingComp: (newComp) => {
			set(newComp);
		},
	})
);

export interface IWorkTreeNode {
	id: string;
	type: TMaterialType;
	children: IWorkTreeNode[];
	sibling: IWorkTreeNode | null;
	data: any;
}

export type Listener = () => void;

const Root: IWorkTreeNode = {
	id: "Workspace",
	type: "Workspace",
	children: [],
	sibling: null,
	data: null,
};
const listeners = new Set<Listener>();

function subscribe(listener: Listener) {
	listeners.add(listener);

	return () => {
		listeners.delete(listener);
	};
}

function flush() {
	listeners.forEach((l) => {
		l();
	});
}

function update(action: (root: IWorkTreeNode) => void, id?: string) {
	let targetNode = Root;
	if (id) {
		targetNode = findTreeNodeById(id)!;
	}

	action(targetNode);
	flush();
}

export const useTreeStore = () => {
	const tree = useSyncExternalStore(subscribe, () => Root);

	return [tree, update] as const;
};

// store utils
export const findTreeNodeById = (id: string): IWorkTreeNode | null => {
	function dfs(id: string, node: IWorkTreeNode): IWorkTreeNode | null {
		let final = null;
		if (node.id === id) {
			final = node;
		} else {
			for (const n of node.children) {
				const t = dfs(id, n);
				if (t) {
					final = t;
					break;
				}
			}
		}
		return final;
	}

	return dfs(id, Root);
};
