import React, { useState, useEffect } from "react";
import { Card, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { _fetch, _Walletaccount } from "../../src/CONTRACT-ABI/connect";
import { useNavigate } from "react-router-dom";
import { encode } from "js-base64";
import swal from "sweetalert";

const Login = () => {
  const [wallet, setWallet] = useState(null);
  let history = useNavigate();

  useEffect(() => {
    getDetails();
  }, [wallet]);

  const getDetails = async () => {
    const currentWallet = await _Walletaccount();
    setWallet(currentWallet);
  };

  const saveData = async () => {
    const getUser = await _fetch("user", wallet);
    if (getUser?.addressId === "0x0000000000000000000000000000000000000000") {
      swal("Usr not found!", "Please sign up", "warning");
    } else {
      localStorage.setItem("uid", encode(getUser?.addressId));
      history("/");
    }
  };

  return (
    <>
      <Grid container>
        <Grid item lg={2} md={2} sm={12} xs={12}></Grid>
        <Grid item lg={8} md={8} sm={12} xs={12}>
          <Card style={{ marginLeft: "15px", marginTop: "20px", padding: 3 }}>
            <Typography
              component="h1"
              variant="h5"
              style={{ marginLeft: "15px", marginTop: "10px", padding: 3 }}
            >
              Connect wallet
            </Typography>
            <div
              className="p-8 h-full"
              style={{ justifyContent: "center", padding: "20px" }}
            >
              <Typography
                marginBottom="25px"
                className="address"
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  width: "30rem",
                }}
              >
                Address: <b>{wallet}</b>
              </Typography>
              <Button
                type="submit"
                variant="contained"
                style={{ margin: 20, float: "right" }}
                onClick={() => saveData()}
              >
                Connect
              </Button>
            </div>
          </Card>
        </Grid>
        <Grid item lg={2} md={2} sm={12} xs={12}></Grid>
      </Grid>
    </>
  );
};
export default Login;
