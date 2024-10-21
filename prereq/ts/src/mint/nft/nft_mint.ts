import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createSignerFromKeypair, signerIdentity, generateSigner, percentAmount } from "@metaplex-foundation/umi"
import { createNft, mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";

import wallet from "../../../wallet.json";
import base58 from "bs58";

const RPC_ENDPOINT = "https://api.devnet.solana.com";
const umi = createUmi(RPC_ENDPOINT);

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const myKeypairSigner = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(myKeypairSigner));
umi.use(mplTokenMetadata())

const mint = generateSigner(umi);

(async () => {
    try {
        let tx = createNft(umi, {
            mint: mint,
            name: "CKPK NFT",
            symbol: "CKPKNFT",
            uri: "https://devnet.irys.xyz/HmzuGGKwvFZfKEZ3Zdz6NL6pp1gejjzJNZKEPfD4Qf3",
            sellerFeeBasisPoints: percentAmount(5, 2), // 5% royalty
            isCollection: false,
            collection: null, 
            uses: null,
            creators: [
                {
                    address: myKeypairSigner.publicKey,
                    share: 100,
                    verified: false,
                }
            ],
        });

        let result = await tx.sendAndConfirm(umi);
        const signature = base58.encode(result.signature);
        
        console.log(`Successfully Minted! Check out your TX here:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`);
        console.log("Mint Address: ", mint.publicKey);
    } catch (error) {
        console.error("Error creating NFT:", error);
    }
})();