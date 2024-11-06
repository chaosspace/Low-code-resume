import styles from "./sidePane.module.less";
import { MaterialConfig } from "../../materiel";

export const SidePane = () => {
	return (
		<div className={styles["side-pane"]}>
			{MaterialConfig.map((item) => {
				return (
					<div key={item.name} className={styles["item"]}>
						{item.name}
					</div>
				);
			})}
		</div>
	);
};
