import { generateUniqueHash } from "@/utils";
import { create } from "zustand";

const id = "a242671affa63f852b77022b4db26e803d36b512";

interface IBaseCompData {
	type: string;
	id: string;
}

interface IWorkingStore {
	currentWorkingComp: IBaseCompData;
}

interface IWorkingStoreActions {
	setWorkingComp(newComp: IBaseCompData): void;
}

generateUniqueHash().then((res) => {
	console.log(res);
});

export const useWorkStore = create<IWorkingStore & IWorkingStoreActions>((set) => ({
	currentWorkingComp: {
		type: "Workspace",
		id: id,
	},
	setWorkingComp: (newComp) => {
		set({ currentWorkingComp: newComp });
	},
}));
