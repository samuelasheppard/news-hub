import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import DayWeather from "./DayWeather";
import gsap from "gsap";

function Weather() {
  const weatherArray = useSelector((state) => state.weather);
  const weatherBanner = useRef();

  const dayMap = (array) => {
    return array.map((day) => {
      return <DayWeather key={day.dt} data={day} />;
    });
  };

  useEffect(() => {
    gsap.fromTo(
      ".weather--banner",
      { x: window.innerWidth },
      {
        x: -weatherBanner.current.scrollWidth,
        duration: window.innerWidth / 15,
        repeat: -1,
        ease: "none",
      }
    );
  }, [weatherArray]);

  return (
    <div ref={weatherBanner} className="weather--banner">
      {weatherArray && dayMap(weatherArray)}
    </div>
  );
}

export default Weather;
