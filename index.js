const {
 Connection,
 PublicKey,
 clusterApiUrl,
 Keypair,
 LAMPORTS_PER_SOL,
 Transaction,
 Account,
} = require("@solana/web3.js");

const getWalletBalance = async () => {
    try {
      const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
      const myWallet = await Keypair.fromSecretKey(secretKey);
      const walletBalance = await connection.getBalance(
          new PublicKey(myWallet.publicKey)
      );
      console.log(`=> For wallet address ${publicKey}`);
      console.log(`   Wallet balance: ${parseInt(walletBalance)/LAMPORTS_PER_SOL}SOL`);
    } catch (err) {
        console.log(err);
    }
};

const airdropSol = async () => {
    try {
      const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
      const walletKeyPair = await Keypair.fromSecretKey(secretKey);
      console.log(`-- Airdropping 5 SOL --`)
      const fromAirDropSignature = await connection.requestAirdrop(
          new PublicKey(walletKeyPair.publicKey),
          5 * LAMPORTS_PER_SOL
      );
      await connection.confirmTransaction(fromAirDropSignature);
    } catch (err) {
        console.log(err);
    }
};

const driverFunction = async () => {
  await getWalletBalance();
  await airdropSol();
  await getWalletBalance();
}

const newPair = new Keypair();
const publicKey = new PublicKey(newPair._keypair.publicKey).toString();
const secretKey = newPair._keypair.secretKey
driverFunction();
