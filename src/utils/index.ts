export async function generateUniqueHash() {
	const timestamp = Date.now().toString();
	const randomData = Math.random().toString(36).substring(2, 15);
	const input = timestamp + randomData;

	const encoder = new TextEncoder();
	const data = encoder.encode(input);
	const hashBuffer = await crypto.subtle.digest("SHA-1", data);

	const hashArray = Array.from(new Uint8Array(hashBuffer));
	const hashHex = hashArray
		.map((byte) => byte.toString(16).padStart(2, "0"))
		.join("");
	return hashHex;
}
