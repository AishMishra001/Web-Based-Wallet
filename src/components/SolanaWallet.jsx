import { mnemonicToSeedSync } from "bip39"

const SolanaWallet = ({mnemonic})=>{

  const [ currentIndex , setCurrentIndex] = useState(0); 

  return <div>
    <button onClick={ function(){
      const seed = mnemonicToSeedSync(mnemonic) ; 
      const path = `m/44'/501'/${currentIndex}'/0'` ; 

    }}>
       Add wallet
    </button>

  </div>

}