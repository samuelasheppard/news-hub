import React from "react";
import { useSelector } from "react-redux";
import DayWeather from "./DayWeather";

function Weather() {
  const weatherArray = useSelector((state) => state.weather);

  const dayMap = (array) => {
    return array.map((day) => {
      return <DayWeather key={day.dt} data={day} />;
    });
  };

  return (
    <div className="weather--banner">
      {weatherArray && dayMap(weatherArray)}
    </div>
  );
}

export default Weather;
