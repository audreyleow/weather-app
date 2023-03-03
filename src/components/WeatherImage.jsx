import { useMemo } from "react";
import cloudyLogo from "../assets/cloudy.png";
import rainingLogo from "../assets/raining.png";
import sunnyLogo from "../assets/sunny.png";
import thunderstormLogo from "../assets/thunderstorm.png";

export default function WeatherImage({ weather, height, width }) {
  const logo = useMemo(
    () =>
      weather === "Sunny"
        ? sunnyLogo
        : weather.toLowerCase().includes("thunder")
        ? thunderstormLogo
        : weather.toLowerCase().includes("rain") ||
          weather.toLowerCase().includes("drizzle")
        ? rainingLogo
        : cloudyLogo,
    [weather]
  );

  return (
    <img
      height={height}
      width={width}
      src={logo}
      alt={`${weather}-logo`}
      className="line weather-logo"
    />
  );
}
