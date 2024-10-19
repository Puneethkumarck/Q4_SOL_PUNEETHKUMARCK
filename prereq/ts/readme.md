# Web3 Builders Alliance (WBA) Prerequisite Program - Full Documentation

## Table of Contents
- [Web3 Builders Alliance (WBA) Prerequisite Program - Full Documentation](#web3-builders-alliance-wba-prerequisite-program---full-documentation)
  - [Table of Contents](#table-of-contents)
  - [1. Introduction](#1-introduction)
  - [2. Prerequisites](#2-prerequisites)
  - [3. Project Setup](#3-project-setup)
  - [4. Tasks Overview](#4-tasks-overview)
  - [5. Detailed Task Guide](#5-detailed-task-guide)
    - [5.1 Keypair Generation](#51-keypair-generation)
    - [5.2 Devnet SOL Airdrop](#52-devnet-sol-airdrop)
    - [5.3 SOL Transfer to WBA Program](#53-sol-transfer-to-wba-program)

## 1. Introduction

Welcome to the Web3 Builders Alliance (WBA) Prerequisite Program documentation. This guide will walk you through the process of setting up your development environment, interacting with the Solana devnet, and completing the necessary tasks to enroll in the WBA program.

The prerequisite program is designed to assess your ability to follow processes, execute tasks, debug simple errors, and interact with Solana programs. Successful completion demonstrates your readiness for the main WBA program.

## 2. Prerequisites

Before starting, ensure you have the following installed on your system:
- Node.js (v14 or later)
- npm (usually comes with Node.js)
- Git

Familiarity with TypeScript and basic blockchain concepts is beneficial but not required.

## 3. Project Setup

Follow these steps to set up your project environment:

1. Create a new directory for your project:

```bash
mkdir wba-prereq && cd wba-prereq
```

2. Initialize a new Node.js project:

```bash
npm init -y
```

3. Install the required packages:

```bash
npm install @solana/web3.js @project-serum/anchor typescript ts-node
```
4. Create a `tsconfig.json` file in your project root with the following content:

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

5. Create a `src` directory in your project root:

```bash
mkdir src
```

6. Create the following files in the src directory:

```bash
touch src/keygen.ts src/airdrop.ts src/transfer.ts src/enroll.ts
```

7. Update your package.json to include the following scripts:

```bash
"scripts": {
  "keygen": "ts-node src/keygen.ts",
  "airdrop": "ts-node src/airdrop.ts",
  "transfer": "ts-node src/transfer.ts",
  "enroll": "ts-node src/enroll.ts"
}
```
## 4. Tasks Overview

To complete the **WBA Prerequisite Program**, you will need to:

1. **Generate a new Solana keypair**  
   Use Solana tools (such as the Solana CLI or SDK) to create a new keypair that includes a public and private key pair. This keypair represents your account on the Solana blockchain.

2. **Request an airdrop of SOL tokens on the devnet**  
   After generating your keypair, request free SOL tokens on the Solana devnet to fund your account and complete subsequent tasks.

3. **Transfer 1 SOL to the WBA program address**  
   Once your account is funded with SOL from the airdrop, send 1 SOL to the WBA program’s specified address as part of the program requirements.

4. **Interact with the WBA prerequisite program to complete enrollment**  
   Finally, use the WBA prerequisite program’s instructions to confirm your participation and complete the enrollment process.

## 5. Detailed Task Guide

### 5.1 Keypair Generation

To create a new Solana keypair, implement the following steps in `src/keygen.ts`:

```typescript
import { Keypair } from "@solana/web3.js";
import fs from 'fs';

const keypair = Keypair.generate();

console.log(`Generated new keypair: ${keypair.publicKey.toBase58()}`);

const secret = JSON.stringify(Array.from(keypair.secretKey));
fs.writeFileSync('dev-wallet.json', secret);
console.log('Saved keypair to dev-wallet.json');
```

### 5.2 Devnet SOL Airdrop

Implement the airdrop functionality in `src/airdrop.ts`:

```typescript
import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import fs from 'fs';

const endpoint = 'https://api.devnet.solana.com';
const solanaConnection = new Connection(endpoint);

const secretKeyString = fs.readFileSync('dev-wallet.json', 'utf8');
const secretKey = Uint8Array.from(JSON.parse(secretKeyString));
const keypair = Keypair.fromSecretKey(secretKey);

(async () => {
  try {
    console.log("Requesting airdrop for", keypair.publicKey.toBase58());
    const airdropSignature = await solanaConnection.requestAirdrop(
      keypair.publicKey,
      LAMPORTS_PER_SOL * 2
    );
    await solanaConnection.confirmTransaction(airdropSignature);
    console.log("Airdrop successful");
  } catch (error) {
    console.error("Airdrop failed:", error);
  }
})();
```

### 5.3 SOL Transfer to WBA Program

```typescript
import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, Transaction, SystemProgram, sendAndConfirmTransaction } from "@solana/web3.js";
import fs from 'fs';

const endpoint = 'https://api.devnet.solana.com';
const solanaConnection = new Connection(endpoint);

const secretKeyString = fs.readFileSync('dev-wallet.json', 'utf8');
const secretKey = Uint8Array.from(JSON.parse(secretKeyString));
const keypair = Keypair.fromSecretKey(secretKey);

const WBA_PUBLIC_KEY = new PublicKey("WBAQSygkwMox2VuWKU133NxFrpDZUBdvSBeaBEue2Jq");

(async () => {
  try {
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: keypair.publicKey,
        toPubkey: WBA_PUBLIC_KEY,
        lamports: LAMPORTS_PER_SOL, // 1 SOL
      })
    );
    const signature = await sendAndConfirmTransaction(
      solanaConnection,
      transaction,
      [keypair]
    );
    console.log('Transfer successful:', signature);
  } catch (error) {
    console.error('Transfer failed:', error);
  }
})();
```

