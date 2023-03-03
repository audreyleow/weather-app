import "./App.css";
import Background from "./components/Background";
import WeatherApp from "./components/WeatherApp";
import useWeather from "./hooks/useWeather";
import { Suspense } from "react";

function App() {
  useWeather();

  return (
    <div className="App">
      <Suspense fallback={null}>
        <Background />
        <WeatherApp />
      </Suspense>
    </div>
  );
}

export default App;
