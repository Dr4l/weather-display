import { useState, useEffect } from "react";
import { WeatherIcon } from "./components/WeatherIcon";
import { FeaturedData } from "./components/FeaturedData";
import { MainData } from "./components/MainData";
import { TimeData } from "./components/TimeData";
import { fetchData } from "./utilities/fetchData";
import { Forecast } from "./components/Forecast";
import { destructureDate } from "./utilities/time_data";
import "./App.css";

function App() {
  const [data, setData] = useState();

  function updateDate(date) {
    setData((previousData) => ({ ...previousData, time: date }));
  }

  useEffect(() => {
    let timerID = setInterval(() => {
      const date = destructureDate(new Date());

      updateDate(date);

      if (date.minute % 30 === 0 && parseInt(date.second, 10) === 0) {
        fetchData()
          .then((res) => {
            setData(res);
          })
          .catch((error) => console.error(error));
      }
    }, 1000); // Added missing interval delay
    fetchData()
      .then((res) => {
        setData({ ...res, time: destructureDate(new Date()) });
      })
      .catch((error) => console.error(error));

    return () => clearInterval(timerID);
  }, []);

  if (!data) return null;

  return (
    <div className="app">
      <div className="featured-data">
        <FeaturedData city="Sinaia" />
      </div>

      <div className="temperature-display">
        <WeatherIcon weatherCode={data.weatherCode}/>
      </div>
      <div className="main-data">
        <MainData temperature={data.temperature} apparentTemperature={data.apparentTemperature}/>
      </div>
      <div className="time-data">
        <TimeData time={data.time} />
      </div>
      <div className="forecast">
        <Forecast Forecast={data.Forecast}/>
      </div>
    </div>
  );
}

export default App;
