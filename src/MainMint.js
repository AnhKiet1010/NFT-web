import React, { useState } from 'react';
import { ethers, BigNumber } from 'ethers';

const MainMint = ({ accounts, contract, balances, reload }) => {
    const [mintAmount, setMintAmount] = useState(1);
    const isConnected = Boolean(accounts[0]);

    async function handleMint() {
        if (isConnected) {
            try {
                const response = await contract.mint(BigNumber.from(mintAmount), {
                    value: ethers.utils.parseEther((0.02 * mintAmount).toString())
                });
                console.log("response", response);
                reload();
            } catch (err) {
                console.log("error", err);
            }
        }
    }

    const handleDecrement = () => {
        if (mintAmount <= 1) return;
        setMintAmount(mintAmount - 1);
    }

    const handleIncrement = () => {
        if (mintAmount >= 3) return;
        setMintAmount(mintAmount + 1);
    }

    return (
        <div className='w-full flex justify-center items-center h-full pb-36'>
            <div className='' style={{ width: "520px" }}>
                <h1 className='text-5xl mb-6'>RoboPunks</h1>
                <p className='mb-4 vtv323 text-xl'>It's 2078.Can the RoboPunks NFT save humans from destructive rampant NFT speculation? Mint RoboPunks to find out. </p>
                {
                    isConnected ? (
                        <div>
                            <p className='mb-4 vtv323 text-xl'>Address : {accounts[0]} </p>
                            <p className='mb-4 vtv323 text-xl'>Balances : {balances} </p>
                            <div className='my-4'>
                                <button className='btn' onClick={handleDecrement}>-</button>
                                <input readOnly type="number" value={mintAmount} className="w-24 h-10 text-center text-black pl-4" />
                                <button className='btn' onClick={handleIncrement}>+</button>
                            </div>
                            <button className='btn' onClick={handleMint}>Mint now</button>
                        </div>
                    ) : (
                        <p className='text-pink-400'>You must be connected to Mint</p>
                    )
                }
            </div>
        </div>
    )
}

export default MainMint;
