import React from "react";
import { useSelector } from "react-redux";
import DayWeather from "./DayWeather";
import gsap from "gsap";

function Weather() {
  const weatherArray = useSelector((state) => state.weather);

  const dayMap = (array) => {
    return array.map((day) => {
      return <DayWeather key={day.dt} data={day} />;
    });
  };

  if (window.innerWidth >= 768) {
    gsap.fromTo(
      ".weather--banner",
      { x: window.innerWidth },
      { x: -window.innerWidth, duration: 45, repeat: -1, ease: "none" }
    );
  } else {
    gsap.fromTo(
      ".weather--banner",
      { x: window.innerWidth },
      { x: -window.innerWidth, duration: 15, repeat: -1, ease: "none" }
    );
  }

  return (
    <div className="weather--banner">
      {weatherArray && dayMap(weatherArray)}
    </div>
  );
}

export default Weather;
