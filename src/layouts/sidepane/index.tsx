import styles from "./sidePane.module.less";
import { MaterialConfig } from "../../material";
import { IWorkTreeNode, useTreeStore, useWorkingStore } from "@/store";
import { setupTree } from "@/utils/tree";

export const SidePane = () => {
	const [tree, updateTree] = useTreeStore();
	const { setWorkingComp, id: workingCompId } = useWorkingStore();

	const hanldeMaterialClick = (nodeName: string) => {
		updateTree(() => {
			const a: IWorkTreeNode = 1 as any;
			a;
			console.log(nodeName, "clicked");
		}, workingCompId);
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
							onClick={() => hanldeMaterialClick(item.name)}
						>
							{item.name}
						</div>
					);
				})}
			</div>
			<div className={styles["structure"]}>
				<div className={styles["title"]}>WorkTree结构</div>
				<div className={styles["container"]}>
					{setupTree(tree, { setWorkingComp, workingCompId })}
				</div>
			</div>
		</div>
	);
};
