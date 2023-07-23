import { ethers } from "ethers";
import abi from "./abi.json";
import { toast } from "react-toastify";

// Sử dụng provider đã tạo từ import.meta.VITE_REACT_SEPOLIA_ENDPOINT
const provider = new ethers.JsonRpcProvider(
  `${import.meta.env.VITE_REACT_SEPOLIA_ENDPOINT}`
  // "https://ethereum-sepolia.blockpi.network/v1/rpc/public"
);
console.log(provider);
// Sử dụng import.meta.VITE_REACT_CONTRACT_ADDRESS để lấy contract address
const contractAddress = `${import.meta.env.VITE_REACT_CONTRACT_ADDRESS}`;

const contractABI = abi; // Thay thế bằng ABI của smart contract bạn muốn tương tác

// Hàm tạo wallet từ private key
async function createWallet(privatekey) {
  try {
    // if (
    //   !privatekey ||
    //   typeof privatekey !== "string" ||
    //   privatekey.length !== 66 ||
    //   !ethers.utils.isHexString(privatekey)
    // ) {
    //   throw new Error("Private key không hợp lệ." + privatekey);
    // }

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

// Hàm tạo connected contract từ private key
async function createConnectedContract(privateKey) {
  try {
    const wallet = await createWallet(privateKey, provider);
    const connectedContract = new ethers.Contract(
      contractAddress,
      // "0x0859aDdfc2273D7f0f66E7776E578639C80dEEB9",
      contractABI,
      wallet
    );
    return connectedContract;
  } catch (error) {
    console.error("Lỗi khi tạo connected contract:", error);
    return null;
  }
}

export const addDraft = async (privateKey, data) => {
  try {
    // Tạo connected contract từ private key
    console.log(data);
    const connectedContract = await createConnectedContract(privateKey);
    console.log(31313);
    // // Gọi hàm addDraft trong smart contract
    connectedContract
      .addDraft(1, 1, {
        gasLimit: 300000, // Replace this value with an appropriate gas limit for your function
      })
      .then((res) => console.log(res))
      .catch((err) => {
        toast.error(err.toString());
      });
    // console.log("Giao dịch:", transaction);

    // // Đợi giao dịch được xác nhận
    // const receipt = await transaction.wait();
    // console.log("Giao dịch được xác nhận:", receipt);

    // // Xử lý kết quả của giao dịch (nếu cần)
    // ...
  } catch (error) {
    console.error("Lỗi khi gọi hàm addDraft:", error);
  }
};
