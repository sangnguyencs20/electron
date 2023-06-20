import * as ethers from "ethers";
import store from "../state";

import CryptoJS from "crypto-js";

const EthereumTx = require("ethereumjs-tx");

export async function encryptPass(rawPass: string) {
  let pass_buffer = Buffer.from(rawPass).toString("hex");
  let encrypted_pass = ethers.utils.keccak256("0x" + pass_buffer);
  return encrypted_pass;
}

export const validateEmail = (value: string) => {
  const emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
  return emailValid;
};

export async function getPrivateKey() {
  const { userState } = store.getState();
  let key = userState.privateEncrypted;
  let pass = userState.password;
  let rawPass = CryptoJS.AES.decrypt(pass, "VBC");
  let bytes = CryptoJS.AES.decrypt(
    key.toString(),
    rawPass.toString(CryptoJS.enc.Utf8)
  );
  let privatekey = bytes.toString(CryptoJS.enc.Utf8);
  let privatekey_slice = privatekey.substring(2, privatekey.length);
  let Buffer_privatekey = Buffer.from(privatekey_slice.toString(), "hex");
  return Buffer_privatekey;
}

export async function createRawTransaction(raw: string) {
  let privateKey = await getPrivateKey();
  let tx = new EthereumTx(raw, { chain: 4 });
  tx.sign(privateKey);
  let rawTx = "0x" + tx.serialize().toString("hex");
  return rawTx;
}

export async function decryptPrivateKey(key: string, pass: string) {
  let rawPass = pass;
  let bytes = CryptoJS.AES.decrypt(key.toString(), rawPass);
  let privatekey = bytes.toString(CryptoJS.enc.Utf8);
  let privatekey_slice = privatekey.substring(2, privatekey.length);
  let Buffer_privatekey = Buffer.from(privatekey_slice.toString(), "hex");
  return Buffer_privatekey;
}
