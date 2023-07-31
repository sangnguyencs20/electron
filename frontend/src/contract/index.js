import { ethers } from "ethers";
import electron from "./electron.json";
import { toast } from "react-toastify";
import { hexToBytes20, uint8ArrayToHexString } from "../utils";

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

    return connectedContract;
  } catch (error) {
    console.error("Lỗi khi tạo connected contract:", error);
    return null;
  }
}

export const createDraft = async (privatekey, data) => {
  try {
    console.log("create id: ", uint8ArrayToHexString(hexToBytes20(data._id)));
    const tx = await contract.createDraft(
      hexToBytes20(data._id),
      data._content_hashed,
      data._level1Approvers
    );
    const res = await tx.wait(2);
    console.log(res);
    return res.hash;
  } catch (error) {
    console.error("Lỗi khi gọi hàm addDraft:", error, contract);
    throw Error(error);
  }
};

export const submitDraft = async (privatekey, data) => {
  try {
    // if (!contract)
    //   contract = await createConnectedContract(
    //     `${import.meta.env.VITE_REACT_PRIVATE_KEY}`
    //   );
    console.log(data);
    console.log("submit id: ", uint8ArrayToHexString(hexToBytes20(data._id)));
    const tx = await contract.submitDraft(
      hexToBytes20(data._id),
      data._deadlineApprove
    );
    const res = await tx.wait(2);
    console.log(res);

    return res.hash;
  } catch (error) {
    console.error("Lỗi khi gọi hàm addDraft:", error, contract);
    throw Error(error);
  }
};

export const decideDraft = async (privatekey, data) => {
  try {
    // if (!contract)
    //   contract = await createConnectedContract(
    //     `${import.meta.env.VITE_REACT_PRIVATE_KEY}`
    //   );
    if (!data?._id) {
      console.error(data);
      throw new Error(data);
    }
    console.log(data);
    console.log("decide id: ", uint8ArrayToHexString(hexToBytes20(data._id)));

    const tx = await contract.decideDraft(
      hexToBytes20(data._id),
      data.decide,
      data.comment_hashed
    );

    const res = await tx.wait(2);
    console.log(res);

    return res.hash;
  } catch (error) {
    console.error("Lỗi khi gọi hàm decideDraft:", error, contract);
    throw Error(error);
  }
};

export const assignLevel2Approver = async (privatekey, data) => {
  try {
    // if (!contract)
    //   contract = await createConnectedContract(
    //     `${import.meta.env.VITE_REACT_PRIVATE_KEY}`
    //   );
    console.log(data);
    console.log("assign id: ", uint8ArrayToHexString(hexToBytes20(data._id)));
    const tx = await contract.assignLevel2Approver(
      hexToBytes20(data._id),
      data.level2Approvers
    );
    const res = await tx.wait(2);
    console.log(res);

    return res.hash;
  } catch (error) {
    console.error("Lỗi khi gọi hàm assignLevel2Approver:", error, contract);
    throw Error(error);
  }
};

export const publish = async (privateKey, data) => {
  try {
    // if (!contract)
    //   contract = await createConnectedContract(
    //     `${import.meta.env.VITE_REACT_PRIVATE_KEY}`
    //   );
    console.log(data);
    const tx = await contract.publish(hexToBytes20(data._id));
    const res = await tx.wait(2);
    console.log(res);

    return res.hash;
  } catch (error) {
    console.error("Lỗi khi gọi hàm publish:", error, contract);
    throw Error(error);
  }
};
export const finish = async (data) => {
  try {
    // if (!contract)
    //   contract = await createConnectedContract(
    //     `${import.meta.env.VITE_REACT_PRIVATE_KEY}`
    //   );
    console.log(data);
    const tx = await contract.finish(hexToBytes20(data._id));
    const res = await tx.wait(2);
    console.log(res);

    return res.hash;
  } catch (error) {
    console.error("Lỗi khi gọi hàm finish:", error, contract);
    throw Error(error);
  }
};

export const SCcomment = async (privatekey, data) => {
  try {
    // if (!contract)
    //   contract = await createConnectedContract(
    //     `${import.meta.env.VITE_REACT_PRIVATE_KEY}`
    //   );
    const electron = await createConnectedContract(privatekey);
    console.log(data);
    const tx = await electron.comment(
      hexToBytes20(data._id),
      data._contentHashed
    );
    const res = await tx.wait(2);
    console.log(res);

    return res.hash;
  } catch (error) {
    console.error("Lỗi khi gọi hàm SCcomment:", error, contract);
    throw Error(error);
  }
};
