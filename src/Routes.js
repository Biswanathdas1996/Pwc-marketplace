import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./Pages/Home";
import PublishArt from "./Pages/PublishArt";
import DetailsPage from "./Pages/DetailsPage";
import TopSelling from "./Pages/TopSelling";
import CategoryWiseList from "./Pages/CategoryWiseList";
import Profile from "./Pages/Profile";
import HowITworks from "./Pages/HowITworks";
import Register from "./Pages/Register";
import Login from "./Pages/Login";

class Routing extends React.Component {
  render() {
    return (
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/publishArt" element={<PublishArt />} />
        <Route exact path="/details/:tokenId" element={<DetailsPage />} />
        <Route
          exact
          path="/category/:category"
          element={<CategoryWiseList />}
        />
        <Route exact path="/top-selling" element={<TopSelling />} />

        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/HowItWorks" element={<HowITworks />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />

        <Route
          render={function () {
            return <h1>Not Found</h1>;
          }}
        />
      </Routes>
    );
  }
}

export default Routing;
