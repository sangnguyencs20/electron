import { ethers } from "ethers";
import abi from "./abi.json";

const provider = new ethers.providers.JsonRpcProvider(process.env.BLOCKCHAIN_ENDPOINT)

console.log(provider);

const contractAddress = process.env.CONTRACT_ADDRESS;

console.log(contractAddress);

const contractABI = abi;

let contract = null;


