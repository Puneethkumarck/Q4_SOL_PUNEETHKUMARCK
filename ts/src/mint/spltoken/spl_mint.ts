import { Keypair, PublicKey, Connection, Commitment } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, mintTo } from '@solana/spl-token';
import wallet from "../../../wallet.json";

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

const token_decimals = 100_000_000n;

// Mint address
const mint = new PublicKey("FMdHzFXos8yMy4S8KJDmH5S67BypCMKYYnBpEK9Zjh9g");

(async () => {
    try {
        // Create an ATA
        const ata = await getOrCreateAssociatedTokenAccount(connection,keypair,mint,keypair.publicKey);
        console.log(`Your ata is: ${ata.address.toBase58()}`); // EsMiPtFWhMmfV4pDJ5pd2wqtXVvA8gF69eLCUfw13wLi

        // Mint to ATA
        const mintTx = await mintTo(connection,keypair,mint,ata.address,keypair.publicKey,token_decimals);
        console.log(`Your mint txid: ${mintTx}`); // 3dyAS8isV2CM9khQfFYbr1Vks2876x4jYuAx7YeVmg22geA9HiZxskqmLQNPd6GyKJzbBUL2cQkgimo2gS69Fae
    } catch(error) {
        console.log(`Oops, something went wrong: ${error}`)
    }
})()
