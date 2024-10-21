import wallet from "../../../wallet.json";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

(async () => {
    try {
        // Follow this JSON structure
        // https://docs.metaplex.com/programs/token-metadata/changelog/v1.0#json-structure

          const image = "https://devnet.irys.xyz/2ucCw3CR7NmkrDht7F3cZu6c1kXuxsYSde9vFHeWc1HE"
    

         const metadata = {
            name: "PKCK NFT",
            symbol: "CKPKNFT",
            description: "This is my first NFT created with Metaplex",
            image: image,
            attributes: [
                { trait_type: 'Background', value: 'Blue' },
                { trait_type: 'size', value: '70' },
                { trait_type: 'Mouth', value: 'Smile' }
            ],
            properties: {
                files: [
                    {
                        type: "image/png",
                        uri: image
                    },
                ]
            },
            creators: [
                {
                    address: keypair.publicKey,
                    share: 100
                }
            ]
        };

       // Convert the metadata object to a buffer
       const metadataBuffer = Buffer.from(JSON.stringify(metadata));

       // Create a generic file from the metadata buffer
       const metadataFile = createGenericFile(metadataBuffer, 'metadata.json', {
           contentType: 'application/json',
       });

       // Upload the metadata file to Irys
       const [myUri] = await umi.uploader.upload([metadataFile]);
       console.log("Your metadata URI: ", myUri);
    }
    catch(error) {
        console.log("Oops.. Something went wrong", error);
    }
})();
