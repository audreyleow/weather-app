import calendarLogo from "../assets/calendar.png";
import useWeather from "../hooks/useWeather";
import WeatherImage from "./WeatherImage";
import React from "react";
import TemperatureBar from "./TemperatureBar";

export default function ForecastContent() {
  const { data: weather } = useWeather();

  return (
    <div className="forecast-content">
      <div className="summary">
        <img src={calendarLogo} alt="placeholder" className="calendar" />
        10-day forecast
      </div>
      <div className="ten-day">
        {weather.forecast.forecasts.map((day, i) => {
          return (
            <React.Fragment key={i}>
              <div className="divider" />
              <div className="one-day">
                <div className="left">
                  <div className="day">{day.day}</div>
                  <WeatherImage
                    weather={day.weather}
                    height="22px"
                    width="22px"
                  />
                </div>
                <div className="right">
                  <div>{day.temperatureLow}°</div>
                  <TemperatureBar
                    maxTemperature={weather.forecast.maxTemperature}
                    minTemperature={weather.forecast.minTemperature}
                    temperatureLow={day.temperatureLow}
                    temperatureHigh={day.temperatureHigh}
                  />
                  <div>{day.temperatureHigh}°</div>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
