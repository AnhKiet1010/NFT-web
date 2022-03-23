import { useState, useEffect } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import { ethers, BigNumber } from 'ethers';
import './App.css';
import Navbar from './Navbar';
import MainMint from './MainMint';
import roboPunksNFT from './RoboPunksNFT.json';

const roboPunksNFTAddress = process.env.REACT_APP_SC_ADDRESS;


function App() {
  const [accounts, setAccounts] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [contract, setContract] = useState(null);
  const [balances, setBalances] = useState(0);

  function connectAccount() {
    const loadProvider = async () => {
      const provider = await detectEthereumProvider();

      if (provider) {
        const accounts = await provider.request({ method: 'eth_requestAccounts' });
        setAccounts(accounts);
        accounts[0] && setBalances((((await contract.balanceOf(accounts[0])).toNumber())));
      } else {
        alert("Please install metamask!");
      }
    }

    loadProvider();
  }

  function reload() {
    setRefresh(!refresh);
  }

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('chainChanged', () => {
        reload();
      })
      window.ethereum.on('accountsChanged', () => {
        reload();
      })
    }
  });

  useEffect(() => {
    const loadProvider = async () => {
      const provider = await detectEthereumProvider();

      if (provider) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contractProvider = new ethers.Contract(
          roboPunksNFTAddress,
          roboPunksNFT.abi,
          signer
        );
        setContract(contractProvider);
      } else {
        alert("Please install metamask!");
      }
    }

    loadProvider();
  }, [refresh]);

  return (
    <div className='opacity-90 w-full h-full index-10 top-0 left-0 fixed'>
      <div className='App h-full text-center text-white p-10'>
        <Navbar accounts={accounts} setAccounts={setAccounts} connectAccount={connectAccount} />
        <MainMint accounts={accounts} setAccounts={setAccounts} contract={contract} balances={balances} reload={reload} />
      </div>
      <div className='moving-bg'></div>
    </div>
  );
}

export default App;
