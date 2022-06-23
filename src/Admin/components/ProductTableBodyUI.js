import React, { useEffect, useState } from "react";
import { TableRow, TableCell, Typography } from "@mui/material";
import { _fetch } from "../../CONTRACT-ABI/connect";
import Avatar from "@mui/material/Avatar";
import { convertToToken, coinName } from "../../utils";
export default function ProductTableBodyUI({ tokens }) {
  const [price, setPrice] = useState(null);
  const [nftData, setNftData] = useState(null);
  const [owner, setOwner] = useState(null);
  useEffect(() => {
    getDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDetails = async () => {
    const getAllTokenUri = await _fetch("tokenURI", tokens?.token);
    const price = await _fetch("getNftPrice", tokens?.token);
    setPrice(price);
    const getOwner = await _fetch("ownerOf", tokens?.token);
    setOwner(getOwner);

    await fetch(getAllTokenUri)
      .then((response) => response.json())
      .then((data) => {
        setNftData(data);
      });
  };

  return (
    <TableRow hover tabIndex={-1}>
      <TableCell align="center" style={{ display: "flex" }}>
        <Avatar alt="Remy Sharp" src={nftData?.image} />
        <b style={{ margin: 10 }}>{nftData?.name}</b>
      </TableCell>
      <TableCell align="center">{nftData?.category}</TableCell>
      <TableCell align="center">
        {convertToToken(price)} {coinName()}
      </TableCell>
      <TableCell align="center">
        <Typography
          style={{ fontSize: 14, cursor: "pointer" }}
          variant="body2"
          paragraph
          item
          fontWeight="600"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "8rem",
          }}
          title={owner}
        >
          {owner}
        </Typography>
      </TableCell>
      <TableCell align="center">{nftData?.payType}</TableCell>
    </TableRow>
  );
}
