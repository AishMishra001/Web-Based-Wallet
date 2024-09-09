import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";

export const EthWallet = ({mnemonic}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [addresses, setAddresses] = useState([]);

    return (
        <div>
            <button 
onClick={async function() {
    const seed = await mnemonicToSeed(mnemonic);
    const derivationPath = `m/44'/60'/${currentIndex}'/0'`;
     const hdNode = HDNodeWallet.fromSeed(seed);
     const child = hdNode.derivePath(derivationPath);
     const privateKey = child.privateKey;
     const wallet = new Wallet(privateKey);
     setCurrentIndex(currentIndex + 1);
    setAddresses([...addresses, wallet.address]);
}} className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
  Add ETH wallet
  </span>
</button>

            {addresses.map(p => <div className="text-white">
                {p}
            </div>)}
        </div>
    )
}

export default EthWallet ; 


