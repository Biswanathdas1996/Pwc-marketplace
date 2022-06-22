import { _fetch } from "../CONTRACT-ABI/connect";

import {
  _transction as transction,
  _transction_signed,
} from "../CONTRACT-ABI-ERC20/connect";

export const buyNft = async (tokenId) => {
  try {
    const price = await _fetch("getNftPrice", tokenId);
    console.log("===============", price);
    // const owner = await _fetch("ownerOf", tokenId);
    // const account = await _Walletaccount();
    // const responseData = await _transction(
    //   "buyNft",
    //   owner,
    //   account,
    //   Number(tokenId)
    // );

    await transction(
      "approve",
      "0xb78b8053B701a8e83bE191431533090A51fbF7ED",
      price
    );

    const transFreFrom = await _transction_signed(
      "transferFrom",
      "0xfd55CC92d43C9d540975dD3C4177BbEf1015b902",
      "0xb78b8053B701a8e83bE191431533090A51fbF7ED",
      price
    );

    return transFreFrom;
  } catch (error) {
    console.log("Error", error);
    return error;
  }
};
