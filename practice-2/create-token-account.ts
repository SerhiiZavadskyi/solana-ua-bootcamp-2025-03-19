import "dotenv/config";
import { getExplorerLink } from "@solana-developers/helpers";
import { Keypair, clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";

const privateKey = process.env["SECRET_KEY"];
const TOKEN_MINT_ADDRESS = "cNdsyDW6MwNHKAgqgGypSSsAcxWDGyw7VsoMvt9pJTc";

if (privateKey === undefined) {
	console.log("Add SECRET_KEY to .env");
	process.exit(1);
}

const asArray = Uint8Array.from(JSON.parse(privateKey));
const sender = Keypair.fromSecretKey(asArray);
const connection = new Connection(clusterApiUrl("devnet"));

console.log(`🔑 Our public key is: ${sender.publicKey.toBase58()}`);

const tokenMintAccount = new PublicKey(TOKEN_MINT_ADDRESS);
const recipient = new PublicKey("C8HBxVjr3LTmFRdh6StwG966XWekSMjHdqDEMU5TSYNH");
const tokenAccount = await getOrCreateAssociatedTokenAccount(connection, sender, tokenMintAccount, recipient);

console.log(`✅Token Account: ${tokenAccount.address.toBase58()}`);

const link = getExplorerLink("address", tokenAccount.address.toBase58(), "devnet");

console.log(`✅ Created token account: ${link}`);
