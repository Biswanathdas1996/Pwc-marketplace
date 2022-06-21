import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@mui/styles";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import "./styles.css";

let userData = [
  {
    name: "Biswanath Das",
    guid: "bd0002",
    empid: "bd1234",
    coins: 22.4,
  },
  {
    name: "Indrojeet K",
    guid: "ik00055",
    empid: "ik1059",
    coins: 12.9,
  },
  {
    name: "Soumi Kundu",
    guid: "sk00052",
    empid: "sk1050",
    coins: 55,
  },
];

const useStyles = makeStyles((theme) => ({
  buttonCoin: {
    border: "1px solid black",
    color: "black",
    borderRadius: "0",
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function Dashboard() {
  const classes = useStyles();

  let totalCoin = 0;
  userData?.map((ele) => {
    totalCoin += ele.coins;
  });
  return (
    <div className="container">
      <Grid container spacing={2}>
        <Grid item sm={4}>
          <div className="header-box">
            Total User
            <br />
            {userData?.length}
          </div>
        </Grid>
        <Grid item sm={4}>
          <div className="header-box">
            Total coins
            <br />
            {totalCoin}
          </div>
        </Grid>
        <Grid item sm={4}>
          <div className="header-box">
            Total Assets <br />
          </div>
        </Grid>
      </Grid>
      <Grid container spacing={0.2}>
        <Grid item sm={8}></Grid>
        <Grid item sm={4}>
          <div style={{ display: "flex", marginTop: 20 }}>
            <input
              type="text"
              name="search"
              placeholder="Enter data..."
              className="search-input"
            />

            <SearchIcon />
          </div>
        </Grid>
      </Grid>
      <TableContainer>
        <Table
          sx={{ minWidth: 700, marginTop: "2rem" }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">GUID</StyledTableCell>
              <StyledTableCell align="right">Employee Id</StyledTableCell>
              <StyledTableCell align="right">Button</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData?.map((person, i) => (
              <StyledTableRow key={`table_${i}`}>
                <StyledTableCell component="th" scope="row">
                  {person?.name}
                </StyledTableCell>
                <StyledTableCell align="right">{person?.guid}</StyledTableCell>
                <StyledTableCell align="right">{person?.empid}</StyledTableCell>
                <StyledTableCell align="right">
                  <Button
                    color="primary"
                    variant="outlined"
                    className="buttonCoin"
                  >
                    Send coin
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Dashboard;
