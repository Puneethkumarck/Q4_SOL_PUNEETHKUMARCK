import wallet from "../../../wallet.json";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { 
    updateMetadataAccountV2,
    UpdateMetadataAccountV2InstructionAccounts,
    UpdateMetadataAccountV2InstructionDataArgs,
    DataV2Args
} from "@metaplex-foundation/mpl-token-metadata";
import { createSignerFromKeypair, signerIdentity, publicKey } from "@metaplex-foundation/umi";
import base58 from "bs58";
import { findMetadataPda } from "@metaplex-foundation/mpl-token-metadata";
import { some } from "@metaplex-foundation/umi";

// Define our Mint address
const mint = publicKey("FMdHzFXos8yMy4S8KJDmH5S67BypCMKYYnBpEK9Zjh9g")

// Create a UMI connection
const umi = createUmi('https://api.devnet.solana.com');
const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(createSignerFromKeypair(umi, keypair)));

// Your existing metadata JSON URL
const METADATA_URL = "https://gist.githubusercontent.com/Puneethkumarck/4c58da5c1099c7c54599ab06239f71f1/raw/417242b3807befb58d0c41da1c4d0b6655a63bb3/sol_token_metadata.json";

(async () => {
    try {
        // Find the metadata PDA for the mint
        const metadata = findMetadataPda(umi, { mint });
         
        console.log(`Metadata PDA: ${metadata.toString()}`); // 5Z2JkiJWugP872owAFf1WT9fpahKgAcRbBSetRfHDELSB7KfmvTtd9hcmQXtfxuseccaQ2fNDyKsQy85LENdRAbq
        let accounts: UpdateMetadataAccountV2InstructionAccounts = {
            metadata,
            updateAuthority: signer,
        }

        let data: DataV2Args = {
            name: "PKCK",
            symbol: "PKCK",
            uri: METADATA_URL,
            sellerFeeBasisPoints: 0,
            creators: null,
            collection: null,
            uses: null
        }

        let dataArgs: UpdateMetadataAccountV2InstructionDataArgs = {
            data: some(data),
            newUpdateAuthority: null,
            primarySaleHappened: null,
            isMutable: null
        }


        let tx = updateMetadataAccountV2(
            umi,
            {
                ...accounts,
                ...dataArgs
            }
        )

        let result = await tx.sendAndConfirm(umi);
        console.log('Transaction signature:', base58.encode(result.signature));
        console.log('Metadata updated successfully. Metadata URL:', METADATA_URL);
    } catch(error) {
        if (error instanceof Error) {
            console.error(`Oops, something went wrong: ${error.message}`);
        } else {
            console.error(`An unexpected error occurred`);
        }
    }
})();