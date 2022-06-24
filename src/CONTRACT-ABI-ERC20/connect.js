import _ from "lodash";
import Web3 from "web3";
import ABI from "./NFT.json";
import ADDRESS from "./Address.json";
import { WalletPrivateKey, InfuraNodeURL } from "../config";

window?.ethereum?.request({
  method: "eth_requestAccounts",
});

const web3Wallat = new Web3(window.ethereum);

const web3 = new Web3(new Web3.providers.HttpProvider(InfuraNodeURL));
const signer = web3.eth.accounts.privateKeyToAccount(WalletPrivateKey);
web3.eth.accounts.wallet.add(signer);

const unsignedContract = new web3Wallat.eth.Contract(ABI, ADDRESS);
const contract = new web3.eth.Contract(ABI, ADDRESS);

web3Wallat.eth.accounts
  .signTransaction(
    {
      to: "0xF0109fC8DF283027b6285cc889F5aA624EaC1F55",
      value: "1000000000",
      gas: 2000000,
      gasPrice: "234567897654321",
      nonce: 0,
      chainId: 1,
    },
    WalletPrivateKey
  )
  .then(console.log);

export const _transction = async (service, ...props) => {
  const callService = _.get(unsignedContract, ["methods", service]);
  const accounts = await web3Wallat.eth.getAccounts();
  const responseData = await callService(...props)
    .send({
      from: accounts[0],
      gas: "4700000",
      value: 0,
    })
    .then((data) => data)
    .catch((error) => {
      const errorData = { error };
      return { error: errorData.error };
    });
  return responseData;
};

export const _transction_signed = async (service, ...props) => {
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

export const _fetch = async (service, ...props) => {
  const callService = _.get(unsignedContract, ["methods", service]);
  let data;
  if (props) {
    data = await callService(...props).call();
  } else {
    data = await callService().call();
  }

  return data;
};
