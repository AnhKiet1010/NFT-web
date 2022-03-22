import React from "react";
import Facebook from './assets/social-media-icons/facebook_32x32.png';
import Twitter from './assets/social-media-icons/twitter_32x32.png';
import Email from './assets/social-media-icons/email_32x32.png';


const Navbar = ({ accounts, setAccounts }) => {
    const isConnected = Boolean(accounts[0]);

    async function connectAccount() {
        if (window.ethereum) {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts"
            });
            setAccounts(accounts);
        }
    }

    return (
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-12">
                <a href="https://www.facebook.com/"><img src={Facebook} alt="fb" /></a>
                <a href="https://twitter.com/home"><img src={Twitter} alt="tw" /></a>
                <a href="https://mail.google.com/mail"><img src={Email} alt="em" /></a>
            </div>
            <div className="flex items-center gap-12">
                <div>About</div>
                <div>Mint</div>
                <div>Team</div>
                {
                    isConnected ?
                        <p>connected</p>
                        :
                        <button className="btn" onClick={connectAccount}>Connect</button>
                }
            </div>
        </div>
    )
}

export default Navbar;