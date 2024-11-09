import prompts from "prompts";
import path from "node:path";
import { isDirExist } from "./helper.mjs";
import { generateComp } from "./generateComp.mjs";

const { materialName } = await prompts({
	type: "text",
	name: "materialName",
	message: "What is the name of material?",
});

const reg = new RegExp(/[A-Z][a-z]*/);

if (!reg.test(materialName)) {
	console.log("%cThe name of material must be capitalized!");
	process.exit(1);
}

const fileName = materialName.toLowerCase();
const destination = path.resolve("src", "material", fileName);

if (await isDirExist(destination)) {
	console.log("Already had this material!");
	process.exit(1);
}

generateComp(fileName, destination);
