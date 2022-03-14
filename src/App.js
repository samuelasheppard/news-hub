import { useSelector } from "react-redux";
import Header from "./components/Header";
import Weather from "./components/weather/Weather";
import Feeds from "./pages/Feeds";
import MyAccount from "./pages/MyAccount";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import "./css/index.css";
import "./css/app.css";
import { ApiController } from "./ApiController";
import gsap from "gsap";

function App() {
  const currentLocation = useSelector((state) => state.currentLocation);
  const Api = new ApiController();
  const page = useSelector((state) => state.page);

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
    { x: -window.innerWidth * 2, duration: 20, repeat: -1, ease: "none" }
  );

  return (
    <>
      <Router>
        <Header />
        {currentLocation.error === false ? (
          <Weather />
        ) : (
          <div className="error weather">
            Unable to show weather. Please allow location
          </div>
        )}
        <Routes>
          <Route exact path="/" element={<Feeds />} />
          <Route exact path="/myfeed" element={<Feeds filter={true} />} />
          <Route exact path="/account" element={<MyAccount />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
