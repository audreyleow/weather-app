export default function TemperatureBar({
  temperatureLow,
  temperatureHigh,
  maxTemperature,
  minTemperature,
}) {
  const maxMinDifference = maxTemperature - minTemperature;
  const paddingLeft =
    ((temperatureLow - minTemperature) / maxMinDifference) * 100 + "%";
  const paddingRight =
    ((maxTemperature - temperatureHigh) / maxMinDifference) * 100 + "%";

  return (
    <div className="temp-bar-container">
      <div
        className="temp-bar"
        style={{
          paddingLeft,
          paddingRight,
        }}
      />
    </div>
  );
}
