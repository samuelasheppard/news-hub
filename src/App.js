import { useSelector, useDispatch } from "react-redux";
import Header from "./components/Header";
import Weather from "./components/weather/Weather";
import Feed from "./components/feed/Feed";
import { useEffect } from "react";
import React from "react";
import "./css/index.css";
import { ApiController } from "./ApiController";
// f5061f7577794c6391637a546b361154

// https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

function App() {
  const currentLocation = useSelector((state) => state.currentLocation);
  const Api = new ApiController();

  useEffect(() => {
    Api.fetchNews();
  }, []);

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

  return (
    <>
      <Header />
      {currentLocation.error === false ? (
        <Weather />
      ) : (
        <div className="weather--error">
          Unable to show weather. Please allow location
        </div>
      )}

      <Feed />
    </>
  );
}

export default App;
