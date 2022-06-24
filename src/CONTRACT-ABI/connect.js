import _ from "lodash";
import Web3 from "web3";
import ABI from "./NFT.json";
import ADDRESS from "./Address.json";
import { WalletPrivateKey, InfuraNodeURL } from "../config";
import { decode } from "js-base64";

// 1000000000000000000 -> 1000

const metamaskWeb3 = new Web3(window.ethereum);
const web3 = new Web3(new Web3.providers.HttpProvider(InfuraNodeURL));
const signer = web3.eth.accounts.privateKeyToAccount(WalletPrivateKey);
web3.eth.accounts.wallet.add(signer);
const contract = new web3.eth.Contract(ABI, ADDRESS);

export const _transction = async (service, ...props) => {
  const callService = _.get(contract, ["methods", service]);

  const tx = callService(...props);

  const responseData = await tx
    .send({
      from: signer.address,
      // gas: await tx.estimateGas(),
      gas: "4700000",
      value: 0,
    })
    .once("transactionHash", (txhash) => {
      console.log(`Mining transaction ...`);
      console.log(txhash);
      return txhash;
    })
    .catch((error) => {
      const errorData = { error };
      return { error: errorData.error };
    });
  return responseData;
};

export const _transction_unsigned = async (service, ...props) => {
  const callService = _.get(contract, ["methods", service]);
  const accounts = await metamaskWeb3.eth.getAccounts();
  const tx = callService(...props);

  const responseData = await tx
    .send({
      from: accounts[0],
      // gas: await tx.estimateGas(),
      gas: "4700000",
      value: 0,
    })
    .once("transactionHash", (txhash) => {
      console.log(`Mining transaction ...`);
      console.log(txhash);
      return txhash;
    })
    .catch((error) => {
      const errorData = { error };
      return { error: errorData.error };
    });
  return responseData;
};

export const _paid_transction = async (cost, service, ...props) => {
  const callService = _.get(contract, ["methods", service]);

  const responseData = await callService(...props)
    .send({
      from: signer.address,
      value: cost,
    })
    .then((data) => data)
    .catch((error) => {
      const errorData = { error };
      return { error: errorData.error };
    });
  return responseData;
};

export const _account = async () => {
  const uid = localStorage.getItem("uid");
  if (uid) {
    return decode(uid);
  } else {
    return null;
  }
};

export const _Walletaccount = async () => {
  const accounts = await metamaskWeb3.eth.getAccounts();
  return accounts[0];
};

export const _fetch = async (service, ...props) => {
  const callService = _.get(contract, ["methods", service]);
  let data;
  if (props) {
    data = await callService(...props).call();
  } else {
    data = await callService().call();
  }

  return data;
};
