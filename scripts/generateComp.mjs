import path from "path";
import fs, { mkdirSync } from "node:fs";
import { capitalize, convertToKebabCase, isDirExist } from "./helper.mjs";
import handlebars from "handlebars";

export const createStyle = (compName, targetPath) => {
	// 读取文件
	const templatePath = path.resolve("src", "template", "style.hbs");
	const fileData = fs.readFileSync(templatePath, "utf-8");

	// 注入数据
	const template = handlebars.compile(fileData);
	const styleData = template({ compName: convertToKebabCase(compName) });

	// 写入文件
	fs.writeFileSync(targetPath, styleData);
};

export const createComp = (compName, targetPath) => {
	const capitalizedName = capitalize(compName);

	const templatePath = path.resolve("src", "template", "comp.hbs");
	const fileData = fs.readFileSync(templatePath, "utf-8");

	const template = handlebars.compile(fileData);
	const compData = template({
		capitalizedName,
		compName: convertToKebabCase(compName),
	});

	fs.writeFileSync(targetPath, compData);
};

export function generateComp(compName, destination) {
	const capitalizedName = capitalize(compName);

	const styleTargetPath = path.resolve(
		`src/material/${compName}/${capitalizedName}.module.less`
	);
	const compTargetPath = path.resolve(`src/material/${compName}/index.tsx`);

	try {
		mkdirSync(destination);
		createComp(compName, compTargetPath);
		createStyle(compName, styleTargetPath);
	} catch (error) {
		console.log(`Got an error when generating Comp ${compName}`);
		console.log(error);

		revert(`src/material/${compName}`);
		return;
	}

	console.log(`succeed to generate comp ${capitalizedName}`);
}

function revert(path) {
	// 如果文件存在就删除
	if (isDirExist(path)) {
		try {
			fs.rmSync(path, { recursive: true });
		} catch (error) {
			console.log("Crashed when reverting");
			process.exit(1);
		}
	}
}
