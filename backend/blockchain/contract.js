const abi = require("./abi.json");
const { ethers, JsonRpcProvider } = require("ethers");
require("dotenv").config();

const provider = new JsonRpcProvider(process.env.BLOCKCHAIN_ENDPOINT);

const contractAddress = process.env.CONTRACT_ADDRESS;

const contractABI = abi;

const privateKey =
  "be3f5b3e2114109b1cd559e7fbeb4639d549a646085f3aff3127840cde481abc"; // Replace with your actual private key

const wallet = new ethers.Wallet(privateKey, provider);

const contract = new ethers.Contract(contractAddress, contractABI, wallet);

const documentId = "64c66d93f974da03744ecb56";

function hexToBytes20(hexString) {
  const hexWithoutPrefix = hexString.startsWith("0x")
    ? hexString.slice(2)
    : hexString;
  const bytes20Array = [];
  for (let i = 0; i < 40; i += 2) {
    const byte = parseInt(hexWithoutPrefix.substr(i, 2), 16);
    bytes20Array.push(byte);
  }
  return new Uint8Array(bytes20Array);
}

async function checkApprove(documentId) {
  try {
    const bytes20Value = hexToBytes20(documentId);
    const tx = await contract.checkApprove(bytes20Value);
    const res = await tx.wait(2);
    console.log(res.hash);
  } catch (error) {
    console.log("Lỗi khi gọi hàm checkApprove:", error, contract);
  }
}

module.exports = { checkApprove };
