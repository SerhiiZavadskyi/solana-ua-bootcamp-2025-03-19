import "dotenv/config";
import { getExplorerLink } from "@solana-developers/helpers";
import { Keypair, clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { mintTo } from "@solana/spl-token";

const privateKey = process.env["SECRET_KEY"];

if (privateKey === undefined) {
	console.log("Add SECRET_KEY to .env");
	process.exit(1);
}

const TOKEN_MINT_ADDRESS = "cNdsyDW6MwNHKAgqgGypSSsAcxWDGyw7VsoMvt9pJTc";
const TOKEN_ACCOUNT_ADDRESS = "EpQbLRSUs1AGwMUudPj4nsGNKddfoWoLZRGyjFcYC9WU";

const asArray = Uint8Array.from(JSON.parse(privateKey));
const sender = Keypair.fromSecretKey(asArray);
const connection = new Connection(clusterApiUrl("devnet"));

const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 2);

const tokenMintAccount = new PublicKey(TOKEN_MINT_ADDRESS);
const recipientAssociatedTokenAccount = new PublicKey(TOKEN_ACCOUNT_ADDRESS);

const transactionSignature = await mintTo(
	connection,
	sender,
	tokenMintAccount,
	recipientAssociatedTokenAccount,
	sender,
	10 * MINOR_UNITS_PER_MAJOR_UNITS
);

const link = getExplorerLink("transaction", transactionSignature, "devnet");

console.log("✅ Success!");
console.log(`Mint Token Transaction: ${link}`);
