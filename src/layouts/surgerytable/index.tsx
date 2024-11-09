import { useEffect } from "react";
import styles from "./surgerytable.module.less";
import { useWorkingStore } from "@/store";

export const SurgeryTable = () => {
	const workingComp = useWorkingStore();

	useEffect(() => {
		console.log("now working on", workingComp.type);
	}, [workingComp.id]);

	return <div className={styles["surgery-table"]}>SurgeryTable</div>;
};
