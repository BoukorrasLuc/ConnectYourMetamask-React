import "./App.css";

import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

// import ethLogo from "./ethereum-eth-logo.png";

function App() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [provider, setProvider] = useState(null);

  const connectWalletHandler = () => {
    if (window.ethereum && defaultAccount == null) {
      // set ethers provider
      setProvider(new ethers.providers.Web3Provider(window.ethereum));

      // connect to metamask
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          setDefaultAccount(result[0]);
        })
        .catch((error) => {
          setErrorMessage("Please enter your password in metamask");
        });
    } else if (!window.ethereum) {
      setErrorMessage("Please install MetaMask browser extension to interact");
    }
  };

  const disconnectWalletHandler = () => {
    setDefaultAccount(null);
    setUserBalance(null);
    setProvider(null);
    setErrorMessage(null);
  };

  useEffect(() => {
    if (defaultAccount) {
      provider.getBalance(defaultAccount).then((balanceResult) => {
        setUserBalance(ethers.utils.formatEther(balanceResult));
      });
    }
  }, [defaultAccount, provider]);

  let balance;
  if (userBalance === null) {
    balance = <div className="informations">{userBalance}</div>;
  } else {
    balance = <div className="informations">{userBalance} ETH</div>;
  }

  let connectedButton;
  if (userBalance === null) {
    connectedButton = (
      <button onClick={connectWalletHandler}>Connect Wallet</button>
    );
  } else {
    connectedButton = (
      <button onClick={disconnectWalletHandler}>Disconnect Wallet</button>
    );
  }

  return (
    <div className="App">
      <div className="container">
        <div className="brand-logo"></div>
        <div className="brand-title">Connect your MetaMask</div>
        <div className="wallet-informations">
          <label>Address Wallet:</label>
          <div className="informations">{defaultAccount}</div>
          <label>Balance: </label>
          {balance}
          <div className="error-message">{errorMessage}</div>
          {connectedButton}
        </div>
      </div>
    </div>
  );
}

export default App;
