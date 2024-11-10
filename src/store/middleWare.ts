import { ITreeStructure } from ".";
import { findTreeNodeById } from "@/utils/tree";

export const withSelectedSet =
	(initializer: any) => (set: any, get: any, store: any) => {
		const selectedset = (updater: any, replace?: boolean, id?: string) => {
			set((originTree: ITreeStructure) => {
				let targetNode = originTree.root;

				// 如果需要select，就从root上找到对应的
				if (id) {
					targetNode = findTreeNodeById(originTree.root, id)!;
				}

				updater(targetNode);
			}, replace);
		};

		return initializer(selectedset, get, store);
	};
