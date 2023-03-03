import axios from "axios";
import { format } from "date-fns";
import useSWRImmutable from "swr/immutable";

export default function useWeather() {
  const swr = useSWRImmutable(
    "weather",
    async () => {
      const weatherData = await axios
        .get(
          `http://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=Singapore&days=10&aqi=no&alerts=no`
        )
        .then((response) => response.data);

      const todaysForecast = weatherData.forecast.forecastday[0];
      const todayHourly = todaysForecast.hour.map((hour) =>
        getWeatherFromApiObject(hour)
      );
      const today = getWeatherFromApiObject({
        date: todaysForecast.date,
        ...todaysForecast.day,
      });
      const forecasts = weatherData.forecast.forecastday.map((forecastday) =>
        getWeatherFromApiObject({
          date: forecastday.date,
          ...forecastday.day,
        })
      );
      forecasts[0].day = "Today";

      const forecast = {
        maxTemperature: Math.max(
          ...forecasts.map(({ temperatureHigh }) => temperatureHigh)
        ),
        minTemperature: Math.min(
          ...forecasts.map(({ temperatureLow }) => temperatureLow)
        ),
        forecasts,
      };

      const current = getWeatherFromApiObject({
        totalprecip_mm: forecasts[0].totalPrecipitation,
        totalprecip_mm_tmr: forecasts[1].totalPrecipitation,
        ...weatherData.current,
      });

      return {
        today,
        todayHourly,
        forecast,
        current,
      };
    },
    { suspense: true, refreshInterval: 1000 * 60 }
  );

  return swr;
}

function getWeatherFromApiObject(apiObject) {
  return {
    time: !apiObject.time ? undefined : format(new Date(apiObject.time), "ha'"),
    day: !apiObject.date ? undefined : format(new Date(apiObject.date), "EEEE"),
    weather: apiObject.condition.text,
    temperature: apiObject.temp_c
      ? Math.round(apiObject.temp_c)
      : Math.round(apiObject.avgtemp_c),
    temperatureHigh: !apiObject.maxtemp_c
      ? undefined
      : Math.round(apiObject.maxtemp_c),
    temperatureLow: !apiObject.mintemp_c
      ? undefined
      : Math.round(apiObject.mintemp_c),
    windDegree: apiObject.wind_degree,
    windKph: apiObject.wind_kph,
    airTemperature: !apiObject.feelslike_c
      ? undefined
      : Math.round(apiObject.feelslike_c),
    totalPrecipitation: apiObject.totalprecip_mm,
    totalPrecipitationTomorrow: apiObject.totalprecip_mm_tmr,

    humidity: apiObject.humidity,
  };
}
