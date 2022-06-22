import React from "react";
import Grid from "@material-ui/core/Grid";
import "../Styles/admin-styles.css";
import AppWidgetSummary from "./header-cards";
import ThemeProvider from "../Theme/index";
import UserTable from "./user-details";

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
  {
    name: "sk Kundu",
    guid: "sk00052",
    empid: "sk1050",
    coins: 55,
  },
];

function Dashboard() {
  let totalCoin = 0;
  userData?.map((person) => {
    totalCoin += person.coins;
  });
  return (
    <ThemeProvider>
      <div className="container">
        <Grid container spacing={2}>
          <Grid item sm={4}>
            <AppWidgetSummary
              title="Total Users"
              total={userData?.length}
              color="warning"
            />
          </Grid>
          <Grid item sm={4}>
            <AppWidgetSummary
              title="Total coins"
              total={totalCoin}
              color="error"
            />
          </Grid>
          <Grid item sm={4}>
            <AppWidgetSummary
              title="Total Assets "
              total={10}
              color="warning"
            />
          </Grid>
        </Grid>
        <UserTable userData={userData} />
      </div>
    </ThemeProvider>
  );
}

export default Dashboard;
