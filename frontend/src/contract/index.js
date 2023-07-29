import { ethers } from "ethers";
import electron from "./abi.json";
import { toast } from "react-toastify";

// Sử dụng provider đã tạo từ import.meta.VITE_REACT_SEPOLIA_ENDPOINT
const provider = new ethers.JsonRpcProvider(
  `${import.meta.env.VITE_REACT_SEPOLIA_ENDPOINT}`
  // "https://ethereum-sepolia.blockpi.network/v1/rpc/public"
);
console.log(provider);
// Sử dụng import.meta.VITE_REACT_CONTRACT_ADDRESS để lấy contract address
const contractAddress = `${import.meta.env.VITE_REACT_CONTRACT_ADDRESS}`;

const contractABI = electron.abi; // Thay thế bằng ABI của smart contract bạn muốn tương tác
let contract = null;

async function createWallet(privatekey) {
  try {
    const wallet = new ethers.Wallet(privatekey, provider);
    console.log(
      "Địa chỉ ví:",
      wallet.address,
      privatekey,
      wallet.privateKey,
      provider,
      contractAddress
    );
    return wallet;
  } catch (error) {
    console.error("Lỗi khi tạo wallet:", error);
    return null;
  }
}

export async function createConnectedContract(privateKey) {
  try {
    const wallet = await createWallet(privateKey, provider);
    const connectedContract = new ethers.Contract(
      contractAddress,
      contractABI,
      wallet
    );
    contract = connectedContract;

    console.log("contract", contract);
    return connectedContract;
  } catch (error) {
    console.error("Lỗi khi tạo connected contract:", error);
    return null;
  }
}

export const createDraft = async (data) => {
  try {
    // if (!contract)
    //   contract = await createConnectedContract(
    //     `${import.meta.env.VITE_REACT_PRIVATE_KEY}`
    //   );
    console.log(data);
    const tx = await contract.createDraft(
      data._id,
      data._content_hashed,
      data._level1Approvers
    );
    console.log(await tx.wait(2));
  } catch (error) {
    console.error("Lỗi khi gọi hàm addDraft:", error, contract);
  }
};
