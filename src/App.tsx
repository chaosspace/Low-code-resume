import styles from "./App.module.less";
import "./global.less";
import { SidePane, SurgeryTable, WorkSpace } from "./layouts";

function App() {
	return (
		<div className={styles.app}>
			<SidePane />
			<WorkSpace />
			<SurgeryTable />
		</div>
	);
}

export default App;
