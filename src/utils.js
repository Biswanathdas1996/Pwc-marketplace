// import { decode } from "js-base64";
// import Web3 from "web3";

// const metamaskWeb3 = new Web3(window.ethereum);

export const validateUserWithWallat = () => {
  const getUid = localStorage.getItem("uid");
  return getUid;
  //   const accounts = metamaskWeb3.eth.getAccounts();
  //   return accounts[0] === decode(getUid);
};
