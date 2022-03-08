import React from "react";

function DayWeather(props) {
  //date conversions
  const dateObj = new Date(props.data.dt * 1000);
  const day = dateObj.toLocaleString("en-US", { day: "numeric" });
  const month = dateObj.toLocaleString("en-US", { month: "numeric" });
  const dayName = dateObj.toLocaleString("en-US", { weekday: "long" });

  //temperature conversions
  const low = (props.data.temp.min - 273).toFixed(0);
  const high = (props.data.temp.max - 273).toFixed(0);

  return (
    <div className="weather--day">
      <p>
        {dayName} {day}/{month}
      </p>
      <p>
        {high}&deg;c / {low}&deg;c
      </p>
      <img
        src={`http://openweathermap.org/img/wn/${props.data.weather[0].icon}@2x.png`}
        alt={props.data.weather[0].main}
      />
    </div>
  );
}

export default DayWeather;
