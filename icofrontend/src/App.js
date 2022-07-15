// import logo from './logo.svg';
import './App.css';
import  { useState } from 'react';
import { ethers } from 'ethers'
import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json';
const GreeterAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";


function App() {
  const[greeting , setGreetingvalue] = useState('')
    async function requestAccount(){
      await window.ethereum.request({method:'eth_requestAccounts'});


    }
    async function fetchGreeting() {
      if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        console.log({ provider })
        const contract = new ethers.Contract(GreeterAddress, Greeter.abi, provider)
        try {
          const data = await contract.greet()
          console.log('data: ', data)
        } catch (err) {
          console.log("Error: ", err)
        }
      }    
    }
    async function setGreeting(){
      if(!greeting)return
      if(typeof window.ethereum !== 'undefined'){
        await requestAccount()
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(GreeterAddress , Greeter.abi , signer);
        const Transaction = await contract.setGreeting(greeting) 
        setGreetingvalue('');
        await Transaction.wait();
        fetchGreeting();
      }



    }
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={fetchGreeting}>Fetch Greeting</button>
        <button onClick={setGreeting}>Set Greeting</button>
        <input onChange={e => setGreetingvalue(e.target.value)} placeholder = "Set Greeting" value={greeting}/>


      </header>
    </div>
  );
}

export default App;
