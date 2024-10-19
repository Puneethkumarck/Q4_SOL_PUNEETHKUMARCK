import { Connection, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import * as fs from 'fs';

const endpoint = 'https://api.devnet.solana.com';
const client = new Connection(endpoint);

const secretKeyString = fs.readFileSync('wallet.json', 'utf8');
const secretKey = Uint8Array.from(JSON.parse(secretKeyString));
const keypair = Keypair.fromSecretKey(secretKey);

(async () => {
  try {
    console.log("Requesting airdrop for", keypair.publicKey.toBase58());
    const airdropSignature = await client.requestAirdrop(
      keypair.publicKey,
      LAMPORTS_PER_SOL,
    );
    const latestBlockhash = await client.getLatestBlockhash();
    await client.confirmTransaction({
      blockhash: latestBlockhash.blockhash,
      lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
      signature: airdropSignature,
    });
    console.log("Airdrop successful");
  } catch (error) {
    console.error("Airdrop failed:", error);
  }
})();