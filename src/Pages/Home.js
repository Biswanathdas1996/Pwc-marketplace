import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Toolbar } from "@mui/material";
// import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import NftCard from "../components/shared/NFT-Card";
// import RecentActivity from "../components/shared/RecentActivity";
import { _fetch } from "../CONTRACT-ABI/connect";
import { useNavigate } from "react-router-dom";
import Loader from "../components/shared/Loader";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { mapDataForPayableCollection } from "../utils";

export default function HomePage() {
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
    const filterData = mapDataForPayableCollection(getAllCollections);
    console.log("-----filterData--------->", filterData);
    setData(filterData);
  }

  return (
    <Container>
      <Box
        sx={{
          pt: 4,
          pb: 2,
        }}
      >
        <Typography
          component="h1"
          variant="h7"
          align="left"
          color="text.primary"
          fontSize="40px"
        >
          Buy Digital Products and services
        </Typography>
      </Box>

      {data && data?.length > 0 ? (
        data?.map((catagoryItems) => (
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={12} lg={12}>
              <Toolbar style={{ padding: 0 }}>
                <Typography
                  component="h3"
                  variant="h7"
                  textAlign="left"
                  color="text.primary"
                  style={{ fontSize: 17, fontWeight: "bold" }}
                >
                  {catagoryItems?.collection}
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
              </Toolbar>
              <Grid container spacing={4}>
                {catagoryItems?.id &&
                  catagoryItems?.id?.length > 0 &&
                  catagoryItems?.id?.map((item) => {
                    return (
                      <Grid item xs={12} sm={6} md={2.4} lg={2.4}>
                        <NftCard tokenId={item} />
                      </Grid>
                    );
                  })}
              </Grid>
            </Grid>
          </Grid>
        ))
      ) : loading ? (
        <Grid item xs={12} sm={12} md={12}>
          <Loader count="10" xs={12} sm={6} md={2.4} />
        </Grid>
      ) : (
        <Grid item xs={12} sm={12} md={12}>
          <h3>No NFT available</h3>
        </Grid>
      )}

      <center>
        {!loading && tokens?.length > 0 && (
          <Button
            onClick={() => history(`/top-selling`)}
            variant="contained"
            type="button"
            sx={{
              marginRight: "20px",
              textTransform: "none",
            }}
            style={{ margin: 20, width: "8rem" }}
            endIcon={<ChevronRightIcon />}
          >
            View All
          </Button>
        )}
      </center>

      {/* <RecentActivity /> */}
    </Container>
  );
}
