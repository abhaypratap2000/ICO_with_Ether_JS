import Card from 'react-bootstrap/Card';
import { useState } from "react";
import ICO from "../artifacts/contracts/ICO.sol/ICO.json";
import { ethers } from "ethers";


import {contractAddress} from './config'
const contractAbi = ICO.abi;

function CalculateTokens(props) {
  const [items, setItems] = useState(0);

  
  

  async function getToken() {
    if (typeof window.ethereum !== "undefined") {
     
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      await provider.send("eth_requestAccounts", []);
      const contract = new ethers.Contract(contractAddress, contractAbi, provider);
      try {
        let data = await contract.initialSupplyCheck();
        data = parseInt(data);
        data = data / 10 ** 18;
        return data
        // console.log("Token : ", data);
      }
      catch (err) {
        console.log("Error : ", err);
      }
    }
  }
 
  const handleChange = event => {
    setItems(event.target.value);
  };
  
  let a = items;
  async function calculatedToken() {
    let check = await getToken();
    a = parseFloat(a);
    let numTokens1 = 0;
    let numTokens2 = 0;
    let numTokens3 = 0;
    let e_numTokens1 = 0;
    let e_numTokens2 = 0;
    let e_numTokens3 = 0;
    let e_numTokens4 = 0;
    let rj = 0;
    if (a > (check * 25) / 100) {
      numTokens1 = a - (check * 25) / 100;
      e_numTokens1 = (check * 25) / 100;
      rj = rj + e_numTokens1;
      if (numTokens1 > (check * 50) / 100) {
        numTokens2 = numTokens1 - (check * 50) / 100;
        e_numTokens2 = (check * 25) / 100;
        rj = rj + e_numTokens2;
      } else {
        e_numTokens2 = numTokens1 / 2;
        rj = rj + e_numTokens2;
      }
      if (numTokens2 > (check * 75) / 100) {
        numTokens3 = numTokens2 - (check * 75) / 100;
        e_numTokens3 = (check * 25) / 100;
        rj = rj + e_numTokens3;
      } else {
        e_numTokens3 = numTokens2 / 3;
        rj = rj + e_numTokens3;
      }
      if (numTokens3 >= (check * 100) / 100) {
        e_numTokens4 = (check * 100) / 100;
        rj = rj + e_numTokens3;
      } else {
        e_numTokens4 = numTokens3 / 4;
        rj = rj + e_numTokens4;
      }
    } else {
      rj = rj + a;
    }
    setItems(rj);
    console.log(check);
  }

  const style = {
    marginLeft: "15%",
    // justifyContent :'center'
  }
  return (
    <>
      <div style={style}  >
        <Card style={{ width: '77rem', border: "2px solid black", borderRadius: "20px" , justifyContent: 'left'}}>
          <Card.Body>
            <Card.Title style={{
              backgroundColor: props.mode === "dark" ? "cream" : "white",
              color: props.mode === "dark" ? "white" : "black",
            }}>Calculate Tokens</Card.Title>
            <input type="number" placeholder='Enter Value In Ethers' onChange={handleChange} />
            <br />
            <br />
            <h6 style={{
              backgroundColor: props.mode === "dark" ? "cream" : "white",
              color: props.mode === "dark" ? "white" : "black",
            }}>You Will Get Tokens : {items}</h6>
            <br />
            <button onClick={calculatedToken} style={{ border: "2px solid black", borderRadius: "20px" }}>Calculate you Tokens</button>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}



export default CalculateTokens;