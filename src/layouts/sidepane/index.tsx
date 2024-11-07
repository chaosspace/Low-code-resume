import styles from "./sidePane.module.less";
import { MaterialConfig } from "../../material";

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
