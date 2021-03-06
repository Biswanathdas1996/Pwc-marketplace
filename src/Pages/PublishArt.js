import React, { useState, useEffect } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
// import * as Yup from "yup";
import { Card, Grid } from "@mui/material";
import { _transction } from "../../src/CONTRACT-ABI/connect";
import { create } from "ipfs-http-client";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
// import Web3 from "web3";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import DeleteOutlineIcon from "@mui/icons-material/Delete";
import { IpfsViewLink, IPFSLink } from "../config";
import { pink } from "@mui/material/colors";
import TransctionModal from "../components/shared/TransctionModal";
import { coinName } from "../utils";
// const web3 = new Web3(window.ethereum);

const client = create(IPFSLink);

// const VendorSchema = Yup.object().shape({
//   name: Yup.string().required("Name is required"),
//   authorname: Yup.string().required("Authorname is required"),
//   price: Yup.string().required("Price is required"),
//   royelty: Yup.string().required("Royelty amount is required"),
// });

const Mint = () => {
  const [start, setStart] = useState(false);
  const [response, setResponse] = useState(null);
  const [file, setFile] = useState(null);
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [description, setDescription] = useState(null);

  let history = useNavigate();

  const saveData = async ({ title, category, attributes, price, payType }) => {
    setStart(true);
    let responseData;

    if (file) {
      const results = await client.add(file);
      const metaData = {
        name: title,
        category: category,
        payType: payType,
        image: IpfsViewLink(results.path),
        description: description,
        attributes: attributes,
      };

      const resultsSaveMetaData = await client.add(JSON.stringify(metaData));

      responseData = await _transction(
        "mintNFT",
        IpfsViewLink(resultsSaveMetaData.path),
        price,
        category
      );
    }
    setResponse(responseData);
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
    setSelectedFile(event.target.files[0]);
  };

  const modalClose = () => {
    setStart(false);
    setResponse(null);
    history("/admin/products");
  };
  return (
    <>
      {start && <TransctionModal response={response} modalClose={modalClose} />}
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item lg={3} md={3} sm={12} xs={12}></Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <div style={{ margin: 20 }}>
            <Card>
              <Grid container>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <div
                    style={{
                      padding: "20px",
                      background: "white",
                    }}
                  >
                    <h4>Create Tokens</h4>
                    <Formik
                      initialValues={{
                        title: "",
                        text: "",
                        category: "",
                        payType: "",
                        royelty: 0,
                        price: "",
                        attributes: [],
                      }}
                      // validationSchema={VendorSchema}
                      onSubmit={(values, { setSubmitting }) => {
                        saveData(values);
                        setSubmitting(false);
                      }}
                    >
                      {({ touched, errors, isSubmitting, values }) => (
                        <Form>
                          <Grid container>
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                              <div
                                className="form-group"
                                style={{ marginLeft: 10, marginTop: 10 }}
                              >
                                <label for="title" className="my-2">
                                  Choose type{" "}
                                  <span className="text-danger">*</span>
                                </label>
                                <Field
                                  name="category"
                                  component="select"
                                  className={`form-control text-muted ${
                                    touched.category && errors.category
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  style={{ marginRight: 10, padding: 9 }}
                                >
                                  <option>-- Please select --</option>
                                  <option value="Collectables">
                                    Collectables
                                  </option>
                                  <option value="Services">Services</option>
                                  <option value="Award">Award</option>
                                  <option value="Memorabilla">
                                    Memorabilla
                                  </option>
                                </Field>
                              </div>
                            </Grid>
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                              <div
                                className="form-group"
                                style={{ marginLeft: 10, marginTop: 10 }}
                              >
                                <label for="title" className="my-2">
                                  Item Title{" "}
                                  <span className="text-danger">*</span>
                                </label>
                                <Field
                                  type="text"
                                  name="title"
                                  autoComplete="flase"
                                  placeholder="Enter title"
                                  className={`form-control text-muted ${
                                    touched.title && errors.title
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  style={{ marginRight: 10, padding: 9 }}
                                />
                              </div>
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                              <div
                                className="form-group"
                                style={{ marginLeft: 10, marginTop: 10 }}
                              >
                                <label for="title" className="my-2">
                                  Payment Type{" "}
                                  <span className="text-danger">*</span>
                                </label>
                                <Field
                                  name="payType"
                                  component="select"
                                  className={`form-control text-muted ${
                                    touched.payType && errors.payType
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  style={{ marginRight: 10, padding: 9 }}
                                >
                                  <option>-- Please select --</option>
                                  <option value="earn">Earn coin</option>
                                  <option value="expense">Expense coin</option>
                                </Field>
                              </div>
                            </Grid>

                            <Grid item lg={6} md={6} sm={12} xs={12}>
                              <div
                                className="form-group"
                                style={{ marginLeft: 10, marginTop: 10 }}
                              >
                                <label for="title" className="my-2">
                                  Price <span className="text-danger">*</span>
                                </label>
                                <Field
                                  type="number"
                                  name="price"
                                  autoComplete="flase"
                                  placeholder={`Enter price in ${coinName()}`}
                                  className={`form-control text-muted ${
                                    touched.price && errors.price
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  style={{ marginRight: 10, padding: 9 }}
                                />
                              </div>
                            </Grid>

                            <Grid item lg={12} md={12} sm={12} xs={12}>
                              <div
                                className="form-group"
                                style={{ marginLeft: 10, marginTop: 10 }}
                              >
                                <label for="title" className="my-2">
                                  Choose file{" "}
                                  <span className="text-danger">*</span>
                                </label>

                                <input
                                  className={`form-control text-muted`}
                                  type="file"
                                  onChange={onFileChange}
                                />

                                {selectedFile && (
                                  <center>
                                    <img
                                      src={preview}
                                      alt="img"
                                      style={{
                                        marginTop: 20,
                                        height: 300,
                                        width: "auto",
                                      }}
                                    />
                                  </center>
                                )}
                              </div>
                            </Grid>
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                              <div
                                className="form-group"
                                style={{ marginLeft: 10, marginTop: 10 }}
                              >
                                <label for="title" className="my-2">
                                  Description{" "}
                                  <span className="text-danger">*</span>
                                </label>
                                <TextareaAutosize
                                  aria-label="minimum height"
                                  minRows={3}
                                  name="text"
                                  onChange={(e) =>
                                    setDescription(e.target.value)
                                  }
                                  placeholder="Please enter some descriptions"
                                  style={{ width: "100%" }}
                                  className={`form-control text-muted ${
                                    touched.text && errors.text
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                />
                              </div>
                            </Grid>

                            <Grid item lg={12} md={12} sm={12} xs={12}>
                              <div
                                className="form-group"
                                style={{ marginLeft: 10, marginTop: 10 }}
                              >
                                <FieldArray
                                  name="attributes"
                                  render={(arrayHelpers) => (
                                    <div>
                                      {values.attributes &&
                                      values.attributes.length > 0 ? (
                                        values.attributes.map(
                                          (attribut, index) => (
                                            <div
                                              style={{
                                                border: "1px solid #c7c9cc",
                                                borderRadius: 5,
                                                padding: 12,
                                                marginTop: 15,
                                              }}
                                              key={index}
                                            >
                                              <DeleteOutlineIcon
                                                onClick={() =>
                                                  arrayHelpers.remove(index)
                                                }
                                                sx={{ color: pink[500] }}
                                                style={{
                                                  marginBottom: 10,
                                                  float: "right",
                                                  cursor: "pointer",
                                                }}
                                              />
                                              <Grid container>
                                                <Grid
                                                  item
                                                  lg={5}
                                                  md={5}
                                                  sm={12}
                                                  xs={12}
                                                  style={{ marginRight: 20 }}
                                                >
                                                  <Field
                                                    name={`attributes.${index}.trait_type`}
                                                    autoComplete="flase"
                                                    placeholder="Enter Properties name"
                                                    className={`form-control text-muted `}
                                                    style={{
                                                      marginTop: 10,
                                                      padding: 9,
                                                    }}
                                                  />
                                                </Grid>
                                                <Grid
                                                  item
                                                  lg={6}
                                                  md={6}
                                                  sm={12}
                                                  xs={12}
                                                >
                                                  <Field
                                                    name={`attributes.${index}.value`}
                                                    autoComplete="flase"
                                                    placeholder="Enter value"
                                                    className={`form-control text-muted`}
                                                    style={{
                                                      marginTop: 10,
                                                      padding: 9,
                                                    }}
                                                  />
                                                </Grid>
                                              </Grid>
                                            </div>
                                          )
                                        )
                                      ) : (
                                        <Button
                                          variant="outlined"
                                          size="medium"
                                          type="button"
                                          onClick={() => arrayHelpers.push("")}
                                        >
                                          {/* show this when user has removed all attributes from the list */}
                                          Add attributes
                                        </Button>
                                      )}
                                      {values.attributes.length !== 0 && (
                                        <Button
                                          variant="outlined"
                                          size="medium"
                                          type="button"
                                          onClick={() =>
                                            arrayHelpers.insert(
                                              values.attributes.length + 1,
                                              ""
                                            )
                                          }
                                          style={{
                                            marginTop: 10,
                                          }}
                                        >
                                          + Add
                                        </Button>
                                      )}
                                    </div>
                                  )}
                                />
                              </div>
                            </Grid>
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                              <div
                                className="form-group"
                                style={{
                                  marginLeft: 10,
                                  marginTop: 10,
                                  float: "right",
                                }}
                              >
                                <span className="input-group-btn">
                                  <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{
                                      marginRight: "20px",
                                      textTransform: "none",
                                    }}
                                  >
                                    Submit{" "}
                                  </Button>
                                </span>
                              </div>
                            </Grid>
                          </Grid>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </Grid>
              </Grid>
            </Card>
          </div>
        </Grid>
        <Grid item lg={3} md={3} sm={12} xs={12}></Grid>
      </Grid>
    </>
  );
};
export default Mint;
