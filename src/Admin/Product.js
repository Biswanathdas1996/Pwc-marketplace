import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import "../Styles/admin-styles.css";
import ThemeProvider from "../Theme/index";
import ProductTable from "./components/ProductTable";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { _fetch } from "../CONTRACT-ABI/connect";

function Dashboard() {
  const [tokens, setToken] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  let history = useNavigate();

  useEffect(() => {
    fetchAllPosts();
  }, []);

  async function fetchAllPosts() {
    setLoading(true);
    const getAllToken = await _fetch("getToken");
    const getAllCollections = await _fetch("getAllCollections");
    setToken(getAllToken.slice(0, 10));
    setLoading(false);
    var revMyArr = [].concat(getAllCollections).reverse();
    setData(revMyArr);
  }

  return (
    <ThemeProvider>
      <div className="container">
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <Button
              type="button"
              variant="contained"
              style={{ float: "right", padding: 8, borderRadius: 4 }}
              sx={{
                marginRight: "20px",
                textTransform: "none",
              }}
              onClick={() => history("/publishArt")}
            >
              Create Tokens
            </Button>
          </Grid>

          <Grid item sm={12}>
            {data && <ProductTable tokens={data} />}
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
}

export default Dashboard;
