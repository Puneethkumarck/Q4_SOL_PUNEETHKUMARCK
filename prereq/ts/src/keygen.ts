import { Keypair } from "@solana/web3.js";
import * as fs from "fs";

// Generate a new random keypair
const keypair = Keypair.generate();
console.log(`Generated new keypair: ${keypair.publicKey.toBase58()}`);

const secret = JSON.stringify(Array.from(keypair.secretKey));
fs.writeFileSync("wallet.json", secret);
console.log("Secret key saved to wallet.json");
