import "dotenv/config";
import { Keypair } from "@solana/web3.js";

let privateKey = process.env["SECRET_KEY"];

if (privateKey === undefined) {
	console.log("Add SECRET_KEY to .env!");
	process.exit(1);
}
const asArray = Uint8Array.from(JSON.parse(privateKey));
const keypair = Keypair.fromSecretKey(asArray);
const publicKey = keypair.publicKey.toBase58();

console.log(`Public key: ${publicKey}`);

export function getPublicKey(): string {
	return publicKey;
}
