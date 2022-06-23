import { _fetch, _Walletaccount, _transction } from "../CONTRACT-ABI/connect";

import { _transction as transction } from "../CONTRACT-ABI-ERC20/connect";

export const buyNft = async (tokenId) => {
  try {
    const price = await _fetch("getNftPrice", tokenId);
    console.log("===============", price);
    const owner = await _fetch("ownerOf", tokenId);
    const account = await _Walletaccount();

    // await transction(
    //   "approve",
    //   "0xb78b8053B701a8e83bE191431533090A51fbF7ED",
    //   price
    // );

    const transFreFrom = await transction("transfer", owner, price);

    if (transFreFrom?.error) {
      return transFreFrom;
    } else {
      const transfredtxn = await _transction(
        "buyNft",
        owner,
        account,
        Number(tokenId)
      );
      return transfredtxn;
    }
  } catch (error) {
    console.log("Error", error);
    return error;
  }
};
