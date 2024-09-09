import { mnemonicToSeedSync } from "bip39"
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import { useState } from "react";

const SolanaWallet = ({mnemonic})=>{

  const [ currentIndex , setCurrentIndex] = useState(0); 
  const [ publicKeys , setPublicKeys] = useState([]) ; 

  return <div>
   <button 
onClick={ function(){
  const seed = mnemonicToSeedSync(mnemonic) ; 
  const path = `m/44'/501'/${currentIndex}'/0'` ; 
  const derivedSeed = derivePath(path, seed.toString("hex")).key ; 
  const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey ; 
  const keypair = Keypair.fromSecretKey(secret) ; 
  setCurrentIndex( currentIndex + 1 ) ; 
  setPublicKeys([...publicKeys , keypair.publicKey]) ; 
  }} className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
    Add Solona Wallet
  </span>
</button>
    {publicKeys.map(p=> <div className="text-white">
      {p.toBase58()}
    </div>)}

  </div>

}

export default SolanaWallet; 


