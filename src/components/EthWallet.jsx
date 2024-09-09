import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";
import './components.css'; // Ensure CSS is properly imported

export const EthWallet = ({ mnemonic }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wallets, setWallets] = useState([]); // Store an array of { index, address, privateKey }

  const createWallet = async () => {
    const seed = await mnemonicToSeed(mnemonic);
    const derivationPath = `m/44'/60'/${currentIndex}'/0'`;
    const hdNode = HDNodeWallet.fromSeed(seed);
    const child = hdNode.derivePath(derivationPath);
    const privateKey = child.privateKey;
    const wallet = new Wallet(privateKey);

    // Create a new wallet object with index, address, and privateKey
    const newWallet = {
      index: currentIndex,
      address: wallet.address,
      privateKey: privateKey,
    };

    // Update state with the new wallet
    setWallets([...wallets, newWallet]);
    setCurrentIndex(currentIndex + 1); // Increment the wallet index
  };

  const deleteWallet = (index) => {
    setWallets(wallets.filter(wallet => wallet.index !== index));
  };

  return (
    <div>
      <button
        onClick={createWallet}
        className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
      >
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
          Add ETH Wallet
        </span>
      </button>

      {/* Display each wallet with its index, address, and private key */}
      {wallets.map((wallet) => (
        <div key={wallet.index} className="text-white pt-2 border-gray-400 border-2 rounded-2xl mt-4 relative">
          <button
            onClick={() => deleteWallet(wallet.index)}
            className="absolute top-2 right-2 text-red-500 hover:text-red-700 transition-colors"
          >
            &#x1F5D1; {/* Trash icon */}
          </button>
          <p className="text-2xl font-thin pl-4 pb-2">Wallet {wallet.index + 1}:</p>
          <div className="bg-gray-800 pl-4 rounded-xl py-2">
            <div className="flex flex-col">
              <p className="text-lg font-semibold">Address:</p>
              <p className="break-all">{wallet.address}</p>
            </div>
            <div className="flex flex-col mt-2">
              <p className="text-lg font-semibold">Private Key:</p>
              <p className="break-all">{wallet.privateKey}</p> {/* Display private key */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EthWallet;
