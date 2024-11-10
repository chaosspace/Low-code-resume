export function generateUniqueId(): string {
	const timestamp = Date.now(); // 获取当前时间戳，单位毫秒
	const randomNum = Math.floor(Math.random() * 100); // 生成一个0到99之间的随机数
	const uniqueId = ((timestamp % 100000000) + randomNum)
		.toString()
		.padStart(8, "0"); // 保证最终字符串长度为8位
	return uniqueId;
}
