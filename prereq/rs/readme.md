# Solana Rust Project: Enrollment dApp

## Project Description

This project is a Rust-based Solana development application that demonstrates key concepts in Solana blockchain interaction. It includes functionality for:

1. Generating a new Solana keypair
2. Requesting an airdrop of SOL tokens on the Solana devnet
3. Transferring SOL tokens to another address
4. Interacting with a custom Solana program (Turbin3 prerequisite program)

The project serves as a practical introduction to Solana development using Rust, covering essential tasks such as account management, transaction creation, and program interaction.

## Setup and Execution Instructions

### Prerequisites

- Rust and Cargo installed on your system
- Basic familiarity with Rust and Solana concepts

### Step 1: Project Initialization

1. Open your terminal and create a new directory for your project:
   ```
   mkdir rs
   cd rs
   ```

2. Initialize a new Rust library project:
   ```
   cargo init --lib
   ```

3. Open the `Cargo.toml` file and add the following dependencies:
   ```toml
   [dependencies]
   solana-sdk = "1.15.2"
   solana-client = "1.15.2"
   solana-program = "1.15.2"
   bs58 = "0.4.0"
   borsh = "0.10.3"
   solana-idlgen = { git = "https://github.com/deanmlittle/solana-idlgen.git" }
   ```

### Step 2: Setting up the Project Structure

1. Create a `programs` directory in the `src` folder:
   ```
   mkdir src/programs
   ```

2. Create two files in the `programs` directory:
   ```
   touch src/programs/mod.rs
   touch src/programs/Turbin3_prereq.rs
   ```

3. In `src/programs/mod.rs`, add:
   ```rust
   pub mod Turbin3_prereq;
   ```

4. In `src/lib.rs`, add the following at the top of the file:
   ```rust
   mod programs;
   ```

### Step 3: Implementing the Functionality

1. Open `src/lib.rs` and replace its contents with the provided code for keypair generation, airdrop, and token transfer.

2. In `src/programs/Turbin3_prereq.rs`, implement the IDL for the Turbin3 prerequisite program using the `idlgen!` macro.

3. Implement the main functionality in the `tests` module within `src/lib.rs`, including the interaction with the Turbin3 prerequisite program.

### Step 4: Creating Wallet Files

1. Generate a development wallet:
   ```
   cargo test keygen
   ```

2. Save the output private key to a file named `wallet.json`.

3. Create another wallet file named `Turbin3-wallet.json` for your main Turbin3 wallet (keep this secure and don't commit it to version control).

### Step 5: Execution

1. To generate a new keypair:
   ```
   cargo test keygen
   ```

2. To request an airdrop:
   ```
   cargo test airdrop
   ```

3. To transfer SOL:
   ```
   cargo test transfer_sol
   ```

4. To interact with the Turbin3 prerequisite program:
   ```
   cargo test complete_prereq
   ```

### Notes

- Ensure you're connected to the Solana devnet for all operations.
- Keep your wallet files secure and do not commit them to version control.
- You may need to adjust file paths or wallet addresses based on your specific setup.
