import { useSelector } from "react-redux";
import Header from "./components/Header";
import Feeds from "./components/feed/Feeds";
import Weather from "./components/weather/Weather";
import MyAccount from "./components/myAccount/MyAccount";
import Login from "./components/login/Login";
import Signup from "./components/login/Signup";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./css/app.css";
import { ApiController } from "./controllers/ApiController";
import gsap from "gsap";

function App() {
  const currentLocation = useSelector((state) => state.currentLocation);
  const Api = new ApiController();
  const page = useSelector((state) => state.page);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user.loggedIn === true) {
      Api.userGetFavourites(user.email, user.token);
    }
  }, [user]);

  useEffect(() => {
    Api.fetchNews(page);
  }, [page]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      Api.storeLocation,
      Api.storeLocation
    );
  }, []);

  useEffect(() => {
    if (currentLocation.lat && currentLocation.long) {
      Api.fetchWeather(currentLocation.lat, currentLocation.long);
    }
  }, [currentLocation]);

  gsap.fromTo(
    ".error.weather",
    { x: window.innerWidth },
    { x: -window.innerWidth, duration: 20, repeat: -1, ease: "none" }
  );

  return (
    <>
      <Router>
        <div className="fixedBanner">
          <Header />
          {currentLocation.error === false ? (
            <Weather />
          ) : (
            <div className="error weather">
              Unable to show weather. Please allow location
            </div>
          )}
        </div>

        <Routes>
          <Route exact path="/" element={<Feeds />} />
          <Route exact path="/myfeed" element={<Feeds filter={true} />} />
          <Route
            exact
            path="/account"
            element={user.loggedIn === true ? <MyAccount /> : <Login />}
          />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
