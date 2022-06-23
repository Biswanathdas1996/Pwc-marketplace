import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import "../Styles/admin-styles.css";
import AppWidgetSummary from "./components/DashboardCards";
import ThemeProvider from "../Theme/index";
import UserTable from "./components/UserTable";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { _fetch } from "../CONTRACT-ABI/connect";

function Dashboard() {
  let history = useNavigate();
  const [usersData, setUsersData] = React.useState(null);

  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = async () => {
    const getUser = await _fetch("getAllUser");
    setUsersData(getUser);
  };

  return (
    <ThemeProvider>
      <div className="container">
        <Grid container spacing={2}>
          <Grid item sm={4}>
            <AppWidgetSummary
              title="Total Users"
              total={12}
              color="warning"
              style={{ boxShadow: "0px 1px 12px 2px #8888884f" }}
            />
          </Grid>
          <Grid item sm={4}>
            <AppWidgetSummary
              title="Total coins"
              total={2000}
              color="error"
              style={{ boxShadow: "0px 1px 12px 2px #8888884f" }}
            />
          </Grid>
          <Grid item sm={4}>
            <AppWidgetSummary
              title="Total Assets "
              total={10}
              color="warning"
              style={{ boxShadow: "0px 1px 12px 2px #8888884f" }}
            />
          </Grid>
          <Grid item sm={12}>
            <UserTable users={usersData} />
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
}

export default Dashboard;
