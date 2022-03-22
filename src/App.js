import { useState } from 'react';
import './App.css';
import Navbar from './Navbar';
import MainMint from './MainMint';

function App() {
  const [accounts, setAccounts] = useState([]);
  return (
    <div className='opacity-90 w-full h-full index-10 top-0 left-0 fixed'>
      <div className='App h-full text-center text-white p-10'>
        <Navbar accounts={accounts} setAccounts={setAccounts} />
        <MainMint accounts={accounts} setAccounts={setAccounts} />
      </div>
      <div className='moving-bg'></div>
    </div>
  );
}

export default App;
