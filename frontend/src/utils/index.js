import bcrypt from "bcryptjs";
import AES from "aes-js";
import { SHA256 } from "crypto-js";
import { ethers } from "ethers";

export const daysLeft = (deadline) => {
  const difference = new Date(deadline).getTime() - Date.now();
  const remainingDays = difference / (1000 * 3600 * 24);

  return remainingDays.toFixed(0);
};

export const calculateBarPercentage = (goal, raisedAmount) => {
  const percentage = Math.round((raisedAmount * 100) / goal);

  return percentage;
};

export const checkIfImage = (url, callback) => {
  const img = new Image();
  img.src = url;

  if (img.complete) callback(true);

  img.onload = () => callback(true);
  img.onerror = () => callback(false);
};

const options = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  timeZone: "UTC",
};

export const formattedDateTime = (dateTimeString) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZone: "Asia/Ho_Chi_Minh", // Chọn múi giờ cho Việt Nam (UTC+7)
  };

  return new Date(dateTimeString).toLocaleString("vi-VN", options);
};

export async function hashPassword(password) {
  try {
    const salt = bcrypt.genSaltSync(10); // 10 rounds of salting
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw new Error("Hashing failed", error);
  }
}

// Hàm kiểm tra tính hợp lệ của mật khẩu
export async function checkPassword(inputPassword, hashedPassword) {
  try {
    const isMatch = await bcrypt.compare(
      "12345",
      "$2b$10$m/QHLcWFFlWeFjhGlyrNsOzI87yVm/TJFXKA9OUGB4Mge0JEMF.Sq"
    );
    return isMatch;
  } catch (error) {
    throw new Error("Comparison failed", error);
  }
}

export const encryptPrivateKey = (privateKey, password) => {
  const key = SHA256(password).toString();
  const privateKeyBytes = AES.utils.utf8.toBytes(privateKey);
  const aesCtr = new AES.ModeOfOperation.ctr(AES.utils.hex.toBytes(key));
  const encryptedBytes = aesCtr.encrypt(privateKeyBytes);
  const encryptedHex = AES.utils.hex.fromBytes(encryptedBytes);
  return encryptedHex;
};

export const decryptPrivateKey = (encryptedPrivateKey, password) => {
  console.log(encryptedPrivateKey, password);
  const key = SHA256(password).toString();
  const encryptedBytes = AES.utils.hex.toBytes(encryptedPrivateKey);
  const aesCtr = new AES.ModeOfOperation.ctr(AES.utils.hex.toBytes(key));
  const decryptedBytes = aesCtr.decrypt(encryptedBytes);
  const decryptedPrivateKey = AES.utils.utf8.fromBytes(decryptedBytes);
  return decryptedPrivateKey;
};

function adjustKeySize(key) {
  const keyBytes = AES.utils.utf8.toBytes(key);
  const keySize = 32;
  const paddedKey = new Uint8Array(keySize);
  paddedKey.set(keyBytes.slice(0, keySize));
  return paddedKey;
}

// Function to encrypt a link using AES and convert to bytes32
export function encryptLinkToBytes32(link, key) {
  // Convert link and key to bytes (UTF-8 encoding)
  const linkBytes = AES.utils.utf8.toBytes(link);

  // Adjust key size to 32 bytes
  const paddedKey = adjustKeySize(key);

  // Perform AES encryption
  const aesCtr = new AES.ModeOfOperation.ctr(paddedKey, new AES.Counter(5));
  const encryptedBytes = aesCtr.encrypt(linkBytes);

  // Hash the encrypted bytes using SHA-256
  const hash = SHA256(AES.utils.hex.fromBytes(encryptedBytes)).toString();

  // Convert the hash to bytes32 (first 32 bytes of the hash)
  const bytes32String = "0x" + hash.slice(0, 64); // 64 hex characters for 32 bytes
  // const bytes32 = ethers.utils.hexStringToBytes(bytes32String);

  return bytes32String;
}

export function hexToBytes20(hexString) {
  console.log(hexString);
  const hexWithoutPrefix = hexString?.startsWith("0x")
    ? hexString.slice(2)
    : hexString;
  const bytes20Array = [];
  for (let i = 0; i < 40; i += 2) {
    const byte = parseInt(hexWithoutPrefix?.substr(i, 2), 16);
    bytes20Array.push(byte);
  }
  return new Uint8Array(bytes20Array);
}

export const convertDateToSolidityTimestamp = (date) => {
  // Step 1: Get the timestamp from the Date object in JavaScript
  const timestamp = new Date(date).getTime(); // This will give the timestamp in milliseconds

  // Step 2: Convert the timestamp to seconds (Solidity uses Unix timestamps in seconds)
  const timestampInSeconds = Math.floor(timestamp / 1000);

  return timestampInSeconds;
};
export const uint8ArrayToHexString = (uint8Array) => {
  return Array.from(uint8Array, (byte) =>
    ("0" + byte.toString(16)).slice(-2)
  ).join("");
};
