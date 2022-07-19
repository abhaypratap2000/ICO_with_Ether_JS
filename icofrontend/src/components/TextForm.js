import React, { useState } from "react";
import { ethers } from "ethers";
import {contractAddress} from './config'
// import CalculateTokens from "../components/CalculateToken";

import ICO from "../artifacts/contracts/ICO.sol/ICO.json";

//const ICOAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

export default function TextForm(props) {

  const [userAmmount, setuserAmmount] = useState(0);
  // const [Account1 , setAccount1] = useState(null);



  
  async function buyTokensWithEther() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
     await provider.send("eth_requestAccounts", []);
      // console.log(account);
      const signer = provider.getSigner();
      // const price = ethers.utils.parseUnits(userAmmount.price , '18').toString();
      //const price=userAmmount.price*10**18;   
      // console.log(price.toString())
      const contract = new ethers.Contract(contractAddress, ICO.abi, signer);
    //   const tx = signer.sendTransaction({
    //     to: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    //     value: ethers.utils.parseEther(`${userAmmount.price}`),
    //     gasLimit:50000
    // });
      const Transaction = await contract.buyTokensWithEther(userAmmount , {value: ethers.utils.parseEther(`${userAmmount}`)});
      await Transaction.wait();
      // console.log(`${ .utils.parseEther(`${userAmmount.price}`)}}`);
     // console.log(Transaction.value);
    }
  }

  return (
    <>
      <div
        className="container"
        style={{ color: props.mode === "dark" ? "white" : "black" }}
      >
        <h1>{props.heading}</h1>
        <div className="form-group">
          
          <input
            className="form-control"
            // value={userAmmount.price}
            onChange={(e) => {setuserAmmount(e.target.value)}}
            placeholder="Set Ammount"
            id="exampleFormControlTextarea1"
            style={{
              backgroundColor: props.mode === "dark" ? "cream" : "white",
              color: props.mode === "dark" ? "white" : "black",
            }}
            rows="1"
          ></input>
        </div>
       
        <button onClick={buyTokensWithEther}>Buy Token</button>
        {/* <p>The Connected Account is {Account1}</p> */}
        {/* <CalculateTokens/> */}
       
      </div>
    </>
  );
}
