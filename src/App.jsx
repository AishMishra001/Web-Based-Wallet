import { useState } from 'react';
import { generateMnemonic } from 'bip39';
import SolanaWallet from './components/SolanaWallet';
import { EthWallet } from './components/EthWallet';
import './App.css'; // Ensure CSS is properly imported

function App() {
  const [mnemonic, setMnemonic] = useState("");
  const [showMnemonic, setShowMnemonic] = useState(false); // Animation control

  const handleGenerateMnemonic = async () => {
    const mn = await generateMnemonic();
    setMnemonic(mn);

    // Trigger the animation
    setShowMnemonic(false);
    setTimeout(() => {
      setShowMnemonic(true); // Apply the fade-in class
    }, 100); // Small delay for DOM update
  };

  return (
    <div className='bg-black min-h-screen w-screen'>
      <div className='text-white m-auto flex justify-center items-center pt-10'>
        <p className='handjet text-8xl'>Web-based Wallet</p>
      </div>

      <div className='flex justify-center items-center pt-6'>
        <button
          onClick={handleGenerateMnemonic}
          className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-400 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
        >
          Generate Mnemonics
        </button>
      </div>

      {/* Display mnemonic grid with animation */}
      {mnemonic && (
        <div className={`mnemonic-grid mt-4 grid grid-cols-4 gap-4 px-4 border-gray-300 border-2 m-6 py-4 rounded-xl ${showMnemonic ? "fade-in" : ""}`}>
          {mnemonic.split(" ").map((word, index) => (
            <div key={index} className="mnemonic-word bg-white text-black text-center py-2 rounded-md shadow-md">
              {word}
            </div>
          ))}
        </div>
      )}

      <div className='flex p-10 w-screen gap-4'>
        <div className='w-1/2'>
          <SolanaWallet />
        </div>
        <div className='w-1/2'>
          <EthWallet />
        </div>
      </div>
    </div>
  );
}

export default App;
