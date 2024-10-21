import wallet from "../../../wallet.json";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { 
    createMetadataAccountV3, 
    CreateMetadataAccountV3InstructionAccounts, 
    CreateMetadataAccountV3InstructionArgs,
    DataV2Args
} from "@metaplex-foundation/mpl-token-metadata";
import { createSignerFromKeypair, signerIdentity, publicKey } from "@metaplex-foundation/umi";
import base58 from "bs58";

// Define our Mint address
const mint = publicKey("FMdHzFXos8yMy4S8KJDmH5S67BypCMKYYnBpEK9Zjh9g")

// Create a UMI connection
const umi = createUmi('https://api.devnet.solana.com');
const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(createSignerFromKeypair(umi, keypair)));

(async () => {
    try {
        // Start here
        let accounts: CreateMetadataAccountV3InstructionAccounts = {
            mint : mint,
            mintAuthority : signer
        }

        let data: DataV2Args = {
            name : "PKCK",
            symbol: "PKCK",
            uri: "https://pkck.io",
            sellerFeeBasisPoints: 0,
            creators: null,
            collection: null,
            uses: null
        }

        let args: CreateMetadataAccountV3InstructionArgs = {
            data: data,
            isMutable: true,
            collectionDetails: null
        }

         let tx = createMetadataAccountV3(
            umi,
           {
               ...accounts,
                ...args
            }
        )

        let result = await tx.sendAndConfirm(umi);
        console.log(base58.encode(result.signature)); //5Z2JkiJWugP872owAFf1WT9fpahKgAcRbBSetRfHDELSB7KfmvTtd9hcmQXtfxuseccaQ2fNDyKsQy85LENdRAbq
    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();
