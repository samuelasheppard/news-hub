import { useSelector, useDispatch } from "react-redux";
import Header from "./components/Header";
import Weather from "./components/weather/Weather";
import Feed from "./components/feed/Feed";
import { useEffect } from "react";
import React from "react";
import "./css/index.css";
import axios from "axios";
// f5061f7577794c6391637a546b361154

// https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

function App() {
  const currentLocation = useSelector((state) => state.currentLocation);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchNews();
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(storeLocation, storeLocation);
  }, []);

  useEffect(() => {
    if (currentLocation.lat || currentLocation.long) {
      fetchWeather(currentLocation.lat, currentLocation.long);
    }
  }, [currentLocation]);

  const fetchWeather = async (lat, long) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=17a3e02a9cc47ed1eac90bc2f9c0012a`;
      const resp = await axios.get(url);
      dispatch({ type: "STOREWEATHER", payload: resp.data.daily });
    } catch (error) {
      console.log(error);
    }
  };

  const storeLocation = (data) => {
    dispatch({ type: "STORELOCATION", payload: data });
  };

  const fetchNews = async () => {
    try {
      const url =
        "https://newsapi.org/v2/top-headlines?country=gb&apiKey=f5061f7577794c6391637a546b361154";
      const resp = await axios.get(url);
      dispatch({ type: "STORENEWS", payload: resp.data.articles });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      {currentLocation.error === false ? (
        <Weather />
      ) : (
        <div>Unable to show weather. Please allow location</div>
      )}

      <Feed />
    </>
  );
}

export default App;
