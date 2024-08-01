import React from "react";
import "../App.css";

function WeatherInformation(props) {
  const { temperature, shortForecast } = props.weather;

  return (
    <>
      <div id="weatherInformationContainer">
        <div id="temperature">
          {temperature}
          {temperature !== "" && " °"}
        </div>
        <div id="shortForecast">
          {shortForecast}
        </div>
      </div>
    </>
  );
}

export default WeatherInformation;