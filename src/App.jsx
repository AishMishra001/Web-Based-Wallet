import { useState } from 'react'
import './App.css'
import { generateMnemonic } from 'bip39';
import SolanaWallet from './components/SolanaWallet';
import { EthWallet } from './components/EthWallet';

function App() {
  const [count, setCount] = useState(0)
  const [mnemonic , setMnemonic] = useState("") ; 

  return (
    <>
     <button onClick={ async function(){
      const mn = await generateMnemonic(); 
      setMnemonic(mn) ; 
     }}>
        Create Seed Phase 
     </button>
     <input type="text" value={mnemonic} style={{width: '1000px' , height : '100px' , padding : '10px'}}></input>

     <SolanaWallet/>
     <EthWallet/>
    </>
  )
}

export default App
