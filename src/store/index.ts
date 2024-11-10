import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { TMaterialType } from "@/material";
import { withSelectedSet } from "./middleWare";

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

interface Update {
	update: (
		action: (node: IWorkTreeNode) => void,
		replace?: boolean,
		id?: string
	) => void;
}

export interface ITreeStructure extends Update {
	root: IWorkTreeNode;
}

const Root: IWorkTreeNode = {
	id: "Workspace",
	type: "Workspace",
	children: [],
	sibling: null,
	data: null,
};

/**
 * 实现withSelectedSet，可以给set传递第三个参数id，这样action中的传入的node将是与id相等的node，如果没有则为root
 * 使用immer来实现深层树更新
 */
export const useTreeStore = create<ITreeStructure>()(
	immer(
		withSelectedSet((set: any) => ({
			root: Root,
			update: (action: Update, replace?: boolean, id?: string) => {
				set(action as any, replace, id);
			},
		}))
	)
);
