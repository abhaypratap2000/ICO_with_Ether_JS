import React, { useState } from "react";
import { ethers } from "ethers";
import Greeter from "../artifacts/contracts/Greeter.sol/Greeter.json";
import ICO from "../artifacts/contracts/ICO.sol/ICO.json";
const GreeterAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const ICOAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

export default function TextForm(props) {
  const [greeting, setGreetingvalue] = useState("");
  const [userAmmount, setuserAmmount] = useState("");

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  async function fetchGreeting() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log({ provider });
      const contract = new ethers.Contract(
        GreeterAddress,
        Greeter.abi,
        provider
      );
      try {
        const data = await contract.greet();
        console.log("data: ", data);
      } catch (err) {
        console.log("Error: ", err);
      }
    }
  }
  async function setGreeting() {
    if (!greeting) return;
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const a = await provider.getCode(
        "0x5FbDB2315678afecb367f032d93F642f64180aa3"
      );
      console.log(a);
      const contract = new ethers.Contract(GreeterAddress, Greeter.abi, signer);
      const Transaction = await contract.setGreeting(greeting);
      setGreetingvalue("");
      await Transaction.wait();
      fetchGreeting();
    }
  }
  async function buyTokensWithEther() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(ICOAddress, ICO.abi, signer);
      const Transaction = await contract.buyTokensWithEther();
      await Transaction.wait();
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
            value={greeting}
            onChange={(e) => setGreetingvalue(e.target.value)}
            placeholder="Set Greeting"
            id="exampleFormControlTextarea1"
            style={{
              backgroundColor: props.mode === "dark" ? "grey" : "white",
              color: props.mode === "dark" ? "white" : "black",
            }}
            rows="1"
          ></input>
          <input
            className="form-control"
            value={userAmmount}
            onChange={(e) => setuserAmmount(e.target.value)}
            placeholder="Set Ammount"
            id="exampleFormControlTextarea1"
            style={{
              backgroundColor: props.mode === "dark" ? "grey" : "white",
              color: props.mode === "dark" ? "white" : "black",
            }}
            rows="1"
          ></input>
        </div>
        <button onClick={fetchGreeting}>Fetch Greeting</button>
        <button onClick={setGreeting}>Set Greeting</button>
        <button onClick={buyTokensWithEther}>Buy Token</button>
      </div>
    </>
  );
}
