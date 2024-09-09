import { mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import { useState } from "react";
import './components.css'; 

const SolanaWallet = ({ mnemonic }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wallets, setWallets] = useState([]); // Store an array of { index, publicKey, privateKey }

  const createWallet = () => {
    const seed = mnemonicToSeedSync(mnemonic);
    const path = `m/44'/501'/${currentIndex}'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const keypair = Keypair.fromSecretKey(secret);

    const newWallet = {
      index: currentIndex,
      publicKey: keypair.publicKey.toBase58(),
      privateKey: Buffer.from(keypair.secretKey).toString("hex"), // Convert secretKey to hex
    };

    setWallets([...wallets, newWallet]);
    setCurrentIndex(currentIndex + 1);
  };

  const deleteWallet = (index) => {
    setWallets(wallets.filter(wallet => wallet.index !== index));
  };

  return (
    <div className="w-full">
      <button
        onClick={createWallet}
        className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
      >
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
          Add Solana Wallet
        </span>
      </button>

      {/* Display each wallet with its index, public key, and private key */}
      {wallets.map((wallet) => (
        <div key={wallet.index} className="text-white pt-2 border-gray-400 border-2 rounded-2xl mt-4 w-full relative">
          <button
            onClick={() => deleteWallet(wallet.index)}
            className="absolute top-2 right-2 text-red-500 hover:text-red-700 transition-colors"
          >
            &#x1F5D1; {/* Trash icon */}
          </button>
          <p className="Acme text-3xl pl-4 font-thin pb-2">Wallet {wallet.index + 1}:</p>
          <div className="bg-gray-800 pl-4 rounded-xl py-2">
            <div className="flex flex-col">
              <p className="text-lg font-semibold">Public Key:</p>
              <p className="break-all">{wallet.publicKey}</p> {/* Ensure keys don't overflow */}
            </div>
            <div className="flex flex-col mt-2">
              <p className="text-lg font-semibold">Private Key:</p>
              <p className="break-all">{wallet.privateKey}</p> {/* Ensure keys wrap correctly */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SolanaWallet;
