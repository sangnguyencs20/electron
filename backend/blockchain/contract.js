// import { ethers } from "ethers";
const abi = require("./abi.json");
const { ethers, JsonRpcProvider } = require('ethers');
const provider = new JsonRpcProvider(process.env.BLOCKCHAIN_ENDPOINT)

console.log(provider);

const contractAddress = process.env.CONTRACT_ADDRESS;

console.log(contractAddress);

const contractABI = abi;

let contract = null;

console.log(contractABI);
