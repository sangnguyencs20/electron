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
    const filterDraftCreate = connectedContract.filters.DraftCreate(
      null,
      null,
      null,
      null
    );
    connectedContract.on(
      filterDraftCreate,
      (draftId, creator, value, status, event) => {
        console.log("DraftCreate:", draftId, creator, value, status);
      }
    );
    const filterDraftSubmit = connectedContract.filters.DraftSubmit(null);
    connectedContract.on(filterDraftSubmit, (draftId, event) => {
      console.log("DraftSubmit:", draftId);
    });

    const filterDraftApproved = connectedContract.filters.DraftApproved();
    connectedContract.on(filterDraftApproved, (id, approver, event) => {
      console.log("DraftApproved:", id, approver);
    });

    const filterApproverAdded = connectedContract.filters.ApproverAdded();
    connectedContract.on(filterApproverAdded, (id, approver, event) => {
      console.log("ApproverAdded:", id, approver);
    });

    const filterCommentAdded = connectedContract.filters.CommentAdded(
      null,
      null,
      null
    );
    connectedContract.on(
      filterCommentAdded,
      (id, commenter, commentId, event) => {
        console.log("CommentAdded:", id, commenter, commentId);
      }
    );

    console.log("contract", contract);
    return connectedContract;
  } catch (error) {
    console.error("Lỗi khi tạo connected contract:", error);
    return null;
  }
}

export const addDraft = async (privateKey, data) => {
  try {
    if (!contract)
      contract = await createConnectedContract(
        `${import.meta.env.VITE_REACT_PRIVATE_KEY}`
      );

    contract
      .addDraft(1, 1)
      .then((res) => console.log(res))
      .catch((err) => {
        toast.error(err.toString());
      });
  } catch (error) {
    console.error("Lỗi khi gọi hàm addDraft:", error, contract);
  }
};
