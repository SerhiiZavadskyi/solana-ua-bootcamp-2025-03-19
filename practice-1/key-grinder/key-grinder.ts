import { Keypair } from "@solana/web3.js";

let isFound: boolean = false;
let attempts: number = 0;
let publicKey: string = "";
let secretKey: Uint8Array = new Uint8Array(0);
const prefix: string = process.argv[2] ?? "anza";

console.log("In progress...");

while (!isFound) {
	const keypair = Keypair.generate();

	publicKey = keypair.publicKey.toBase58();
	attempts++;

	if (publicKey.toLowerCase().indexOf(prefix) !== -1) {
		isFound = true;
		secretKey = keypair.secretKey;
	}
}

console.log(`Attempts: ${attempts}\nKey start with prefix ${prefix}: ${publicKey}\nSecret key: ${secretKey}`);
console.log("✅ Finished");
