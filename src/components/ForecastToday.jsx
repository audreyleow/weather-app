import useWeather from "../hooks/useWeather";
import WeatherImage from "./WeatherImage";

const AREA = "SINGAPORE";

export default function ForecastToday() {
  const { data: weather } = useWeather();

  return (
    <div className="today-forecast">
      <div className="today-top">
        <div className="area">{AREA}</div>
        <div className="temp">{weather.today.temperature}°</div>
        <div className="weather">{weather.today.weather}</div>
        <div className="range">
          <div>H:{weather.today.temperatureHigh}°</div>
          <div>L:{weather.today.temperatureLow}°</div>
        </div>
      </div>
      <div className="today-bottom">
        {/* <div className="summary">
          Windy conditions from 3PM-5PM, with heavy snow expected at 6PM.
        </div> */}
        <div className="divider" />
        <div className="today-bottom-weather">
          {weather.todayHourly.map((hour) => {
            return (
              <div className="indiv" key={hour.time}>
                <div className="indiv-content">
                  <div className="line">{hour.time}</div>
                  <WeatherImage weather={hour.weather} />
                  <div className="line">{hour.temperature}°</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
