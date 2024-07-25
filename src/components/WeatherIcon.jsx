import "../styles/components/WeatherIcon.css";

export function WeatherIcon({weatherCode}) {
  return (
    <div className={`weather-icon-container`}>
      <img src={weatherCode.image} alt="" className="weather-icon"/>
      <h3 className="weather-icon-description">{weatherCode.description}</h3>
    </div>
  );
}
