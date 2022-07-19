import Card from 'react-bootstrap/Card';
import {useState } from "react";
import ICO from "../artifacts/contracts/ICO.sol/ICO.json";
import { ethers } from "ethers";
import {contractAddress} from './config'

const contractAbi = ICO.abi;

function GetBalance() {
  const[value , setValue] = useState(0);
  
  async function gettingTokenOfAccount() {
    if (typeof window.ethereum !== "undefined") {
    
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const accc = await provider.send("eth_requestAccounts", []);
      const contract = new ethers.Contract(contractAddress, contractAbi, provider);
      try {
        let data = await contract.getBalance(accc[0]);
        data = parseInt(data);
        data = data / 10 ** 18;
        setValue(data);
        console.log("Token : ", data);
      }
      catch (err) {
        console.log("Error : ", err);
      }
    }
  }
  const style = {
    marginLeft : "40%" , 
    marginTop : "1%"
  }
  return (
    <div style={style}>
    <Card style={{ width: '77rem' , border : "2px solid black" , borderRadius : "20px" ,marginLeft  : '-459px' , justifyContent : 'center'}}>
      <Card.Body>
        <Card.Title>Token Balance of Account</Card.Title>
        <p>{value}</p>
        <button style={{border : "2px solid black" , borderRadius : "20px"}} onClick={gettingTokenOfAccount}> Get Balance</button>
      </Card.Body>
    </Card>
    </div>
  );

  
}

export default GetBalance;