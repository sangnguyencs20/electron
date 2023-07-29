import bcrypt from "bcryptjs";
import AES from "aes-js";
import { SHA256 } from "crypto-js";

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

export const formattedDateTime = (dateTimeString) =>
  new Date(dateTimeString).toLocaleString("en-US", options);

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

export function encryptAES(inputString, key) {
  const textBytes = AES.utils.utf8.toBytes(inputString);
  const aesCtr = new AES.ModeOfOperation.ctr(key, new AES.Counter(5));
  const encryptedBytes = aesCtr.encrypt(textBytes);
  return AES.utils.hex.fromBytes(encryptedBytes);
}

// Hàm tính giá trị băm SHA-256 của chuỗi và chuyển đổi thành chuỗi bytes32
export const hashToBytes32 = (inputString) => {
  const hash = SHA256(inputString).toString();
  const bytes32 = "0x" + hash;
  return bytes32;
};

function objectIdToBytes12(objectId) {
  const hexString = objectId.toHexString();
  const bytes12String = hexString.substring(0, 24); // Lấy 12 byte đầu tiên từ hexString
  return "0x" + bytes12String.padEnd(24, "0"); // Đảm bảo chuỗi bytes12 có đủ 24 ký tự (padding bằng 0 nếu cần)
}
