import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Card, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TransctionModal from "../components/shared/TransctionModal";
import { create } from "ipfs-http-client";
import { _transction, _Walletaccount } from "../../src/CONTRACT-ABI/connect";
import { useNavigate } from "react-router-dom";
import { encode } from "js-base64";

const client = create("https://ipfs.infura.io:5001/api/v0");

const VendorSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
});

const Registration = () => {
  const [start, setStart] = useState(false);
  const [response, setResponse] = useState(null);
  let history = useNavigate();
  const saveData = async (value) => {
    const currentWallet = await _Walletaccount();

    setStart(true);
    const results = await client.add(JSON.stringify(value));
    let responseData = await _transction(
      "register",
      `https://ipfs.infura.io/ipfs/${results.path}`,
      currentWallet
    );
    console.log("------>", responseData);
    localStorage.setItem("uid", encode(currentWallet));
    setResponse(responseData);
  };

  const modalClose = () => {
    setStart(false);
    setResponse(null);
    history("/");
  };

  return (
    <>
      {start && <TransctionModal response={response} modalClose={modalClose} />}
      <Grid container>
        <Grid item lg={2} md={2} sm={12} xs={12}></Grid>
        <Grid item lg={8} md={8} sm={12} xs={12}>
          <Card style={{ marginLeft: "15px", marginTop: "20px", padding: 3 }}>
            <Typography
              component="h1"
              variant="h5"
              style={{ marginLeft: "15px", marginTop: "10px", padding: 3 }}
            >
              Registration
            </Typography>
            <div
              className="p-8 h-full"
              style={{ justifyContent: "center", padding: "20px" }}
            >
              <Formik
                initialValues={{
                  name: "",
                  guid: "",
                  employeeID: "",
                }}
                validationSchema={VendorSchema}
                onSubmit={(values, { setSubmitting }) => {
                  saveData(values);
                  setSubmitting(false);
                }}
              >
                {({ touched, errors, isSubmitting }) => (
                  <Form>
                    <div className="form-group" style={{ marginTop: 20 }}>
                      <Field
                        label="Full Name"
                        type="text"
                        name="name"
                        autoComplete="flase"
                        placeholder="Enter full name"
                        className={`form-control text-muted ${
                          touched.name && errors.name ? "is-invalid" : ""
                        }`}
                      />
                    </div>
                    <div className="form-group" style={{ marginTop: 20 }}>
                      <Field
                        label="User Name"
                        type="text"
                        name="guid"
                        autoComplete="flase"
                        placeholder="Enter your guid"
                        className={`form-control text-muted ${
                          touched.guid && errors.guid ? "is-invalid" : ""
                        }`}
                      />
                    </div>
                    <div className="form-group" style={{ marginTop: 20 }}>
                      <Field
                        label="Employee ID"
                        type="text"
                        name="employeeID"
                        autoComplete="flase"
                        placeholder="Enter login Employee ID"
                        className={`form-control text-muted ${
                          touched.employeeID && errors.employeeID
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                    </div>

                    <span className="input-group-btn">
                      <Button
                        type="submit"
                        variant="contained"
                        style={{ marginTop: 20 }}
                      >
                        Sign Up
                      </Button>
                    </span>
                  </Form>
                )}
              </Formik>
            </div>
          </Card>
        </Grid>
        <Grid item lg={2} md={2} sm={12} xs={12}></Grid>
      </Grid>
    </>
  );
};
export default Registration;
