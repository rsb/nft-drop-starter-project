import React, { useEffect, useState } from 'react';
import CandyMachine from "./CandyMachine";
import './App.css';
import twitterLogo from './assets/twitter-logo.svg';

// Constants
const TWITTER_HANDLE = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
  const [walletAddress, setWalletAddress] = useState(null);

  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;

      if (solana && solana.isPhantom) {
        console.log('Phantom  wallet is connected')
      } else {
        alert('Solana object not found! Get a Phantom Wallet 👻')
      }

      const response = await solana.connect({ onlyIfTrusted: true });
      console.log('Connected with Public Key: ', response.publicKey.toString())
      setWalletAddress(response.publicKey.toString())
    } catch (error) {
      console.log(error);
    }
  }

  const connectWallet = async () => {
    const { solana } = window;

    if (! solana) {
      return
    }

    const response = await solana.connect();
    console.log('Connected with Public Key: ', response.publicKey.toString())
    setWalletAddress(response.publicKey.toString())
  };

  const renderNotConnectedContainer = () => (
    <button
      className={'cta-button connect-wallet-button'}
      onClick={connectWallet}
      >
        Connect to wallet
    </button>
  );

  useEffect(() => {
   const onLoad = async () => {
     await checkIfWalletIsConnected();
   }

   window.addEventListener('load', onLoad)
    return () => window.removeEventListener('load', onLoad);
  }, [])

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header">🍭 Candy Drop</p>
          <p className="sub-text">NFT drop machine with fair mint</p>
          {!walletAddress && renderNotConnectedContainer()}
        </div>
        {walletAddress && <CandyMachine walletAddress={window.solana}  />}
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
