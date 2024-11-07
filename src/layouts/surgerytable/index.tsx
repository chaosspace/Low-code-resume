import { useEffect } from "react";
import styles from "./surgerytable.module.less";
import { useWorkStore } from "@/store";

export const SurgeryTable = () => {
	const workingComp = useWorkStore((store) => store.currentWorkingComp);
	console.log("render");

	useEffect(() => {
		console.log("now working on", workingComp.type);
	}, [workingComp]);

	return <div className={styles["surgery-table"]}>SurgeryTable</div>;
};
