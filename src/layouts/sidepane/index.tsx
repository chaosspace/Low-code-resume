import styles from "./sidePane.module.less";
import { MaterialConfig, TMaterialType } from "../../material";
import { IWorkTreeNode, useTreeStore, useWorkingStore } from "@/store";
import { createNode, findTreeNodeBySubId, setupTree } from "@/utils/tree";

export const SidePane = () => {
	const treeStore = useTreeStore();
	const { setWorkingComp, id: workingCompId } = useWorkingStore();

	const handleMaterialClick = (nodeName: TMaterialType) => {
		treeStore.update(
			(originalTree) => {
				const node = createNode(nodeName, null);
				originalTree.children.push(node);
			},
			false,
			workingCompId
		);
	};

	const handleWorkingNodeChange = (node: IWorkTreeNode) => {
		setWorkingComp({ type: node.type, id: node.id });
	};

	const handleTreeNodeDelete = (id: string) => {
		const supNode = findTreeNodeBySubId(treeStore.root, id);
		if (!supNode) return;

		// 如果删除的节点是working node, 将working node变为其父节点
		if (workingCompId === id) {
			handleWorkingNodeChange(supNode[0]);
		}

		treeStore.update(
			(originalTree) => {
				originalTree.children.splice(supNode[1], 1);
			},
			false,
			supNode[0].id
		);
	};

	return (
		<div className={styles["side-pane"]}>
			<div className={styles["materials"]}>
				<div className={styles["title"]}>物料</div>
				{MaterialConfig.map((item) => {
					return (
						<div
							key={item.name}
							className={styles["item"]}
							onClick={() => handleMaterialClick(item.name)}
						>
							{item.name}
						</div>
					);
				})}
			</div>
			<div className={styles["structure"]}>
				<div className={styles["title"]}>WorkTree结构</div>
				<div className={styles["container"]}>
					{setupTree(treeStore.root, {
						handleWorkingNodeChange,
						workingCompId,
						handleTreeNodeDelete,
					})}
				</div>
			</div>
		</div>
	);
};
