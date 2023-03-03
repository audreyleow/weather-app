import ForecastContent from "./ForecastContent";
import ForecastToday from "./ForecastToday";
import ForecastExtra from "./ForecastExtra";
import ForecastLocation from "./ForecastLocation";

export default function WeatherApp() {
  return (
    <div className="weather-container">
      <div className="content">
        <ForecastToday />
        <ForecastContent />
        <ForecastExtra />
        <ForecastLocation />
      </div>
    </div>
  );
}
