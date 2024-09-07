import { mnemonicToSeedSync } from "bip39"
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import { useState } from "react";

const SolanaWallet = ({mnemonic})=>{

  const [ currentIndex , setCurrentIndex] = useState(0); 
  const [ publicKeys , setPublicKeys] = useState([]) ; 

  return <div>
    <button onClick={ function(){
      const seed = mnemonicToSeedSync(mnemonic) ; 
      const path = `m/44'/501'/${currentIndex}'/0'` ; 
      const derivedSeed = derivePath(path, seed.toString("hex")).key ; 
      const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey ; 
      const keypair = Keypair.fromSecretKey(secret) ; 
      setCurrentIndex( currentIndex + 1 ) ; 
      setPublicKeys([...publicKeys , keypair.publicKey]) ; 
      }}>
       Add Solana wallet
    </button>
    {publicKeys.map(p=> <div>
      {p.toBase58()}
    </div>)}

  </div>

}

export default SolanaWallet; 