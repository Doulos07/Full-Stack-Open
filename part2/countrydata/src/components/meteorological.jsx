import { useState, useEffect } from "react";
import meteorologicalServices from "../services/meteorological";

const Meteorological = ({ latlon }) => {
  const [meteorological, setMeteorological] = useState(null);

  useEffect(() => {
    meteorologicalServices.getMeteorology(latlon[0], latlon[1]).then((res) => {
      setMeteorological(res);
    });
  }, [latlon]);

  if (!meteorological) {
    return null;
  }

  return (
    <div>
      <h2>weather in {meteorological.name}</h2>
      <p>Temperature {meteorological.main.temp} Celsius</p>
      <img
        src={`https://openweathermap.org/payload/api/media/file/${meteorological.weather[0].icon}.png`}
        alt={meteorological.weather[0].description}
      />
      <p>Wind {meteorological.wind.speed} m/s</p>
    </div>
  );
};

export default Meteorological;
