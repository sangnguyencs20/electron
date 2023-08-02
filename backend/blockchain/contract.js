const abi = require("./abi.json");
const { ethers, JsonRpcProvider } = require("ethers");
require("dotenv").config();

const provider = new JsonRpcProvider(process.env.BLOCKCHAIN_ENDPOINT);

const contractAddress = process.env.CONTRACT_ADDRESS;

const contractABI = abi;

const privateKey = process.env.PRIVATE_KEY // Replace with your actual private key

async function createWallet(privatekey) {
  try {
    const wallet = new ethers.Wallet(privatekey, provider);
    return wallet;
  } catch (error) {
    console.error("Lỗi khi tạo wallet:", error);
    return null;
  }
}

async function createConnectedContract(privateKey) {
  try {
    const wallet = await createWallet(privateKey, provider);
    const connectedContract = new ethers.Contract(
      contractAddress,
      contractABI,
      wallet
    );
    return connectedContract;
  } catch (error) {
    console.error("Lỗi khi tạo connected contract:", error);
    return null;
  }
}

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
  const contract = await createConnectedContract(privateKey);
  try {
    const bytes20Value = hexToBytes20(documentId);

    const tx = await contract.checkApprove(bytes20Value, {
      gasPrice: 1000000000,
    });

    const res = await tx.wait(2);
    return (res?.hash)?.toString();
  } catch (error) {
    console.log("Lỗi khi gọi hàm checkApprove:", error, contract);
  }
}


module.exports = { checkApprove };
