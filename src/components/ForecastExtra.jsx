import compassLogo from "../assets/compass.png";
import arrowLogo from "../assets/try-arrow.png";
import rainfallLogo from "../assets/rainfall.png";
import humidityLogo from "../assets/humidity.png";
import tempLogo from "../assets/temp.png";
import windLogo from "../assets/wind.png";
import useWeather from "../hooks/useWeather";

export default function ForecastExtra() {
  const { data: weatherData } = useWeather();

  return (
    <div className="forecast-extra">
      <div className="indiv">
        <div className="label mobile-font">
          <img src={windLogo} alt="placeholder" className="logo" />
          wind
        </div>
        <div className="display wind">
          <div
            style={{
              background: `url(${compassLogo})`,
              backgroundSize: "100%",
            }}
            className="compass"
          >
            <img
              src={arrowLogo}
              alt="arrow"
              className="arrow"
              style={{
                transform: `translate(-50%, -50%) rotate(${weatherData.current.windDegree}deg)`,
              }}
            />
            <div className="speed mobile-font">
              {weatherData.current.windKph}km/h
            </div>
          </div>
        </div>
      </div>
      <div className="indiv">
        <div className="label mobile-font">
          <img src={tempLogo} alt="placeholder" className="logo" />
          Air Temperature
        </div>
        <div className="display others">
          {weatherData.current.airTemperature}°
        </div>
        <div className="bottom">
          Humidity is making it
          <br className="remove-small" /> feel warmer
        </div>
      </div>
      <div className="indiv">
        <div className="label mobile-font">
          <img src={humidityLogo} alt="placeholder" className="logo" />
          Humidity
        </div>
        <div className="display others">{weatherData.current.humidity}%</div>
        <div className="bottom">
          The dew point is 24°
          <br className="remove-small" /> right now
        </div>
      </div>
      <div className="indiv">
        <div className="label mobile-font">
          <img src={rainfallLogo} alt="placeholder" className="logo" />
          Rainfall
        </div>
        <div className="display others">
          {weatherData.current.totalPrecipitation} mm{" "}
          <br className="remove-small" />
          in last 24h
        </div>
        <div className="bottom">
          {weatherData.current.totalPrecipitationTomorrow} mm expected in
          <br className="remove-small" /> next 24h.
        </div>
      </div>
    </div>
  );
}
