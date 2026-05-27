import axios from "axios";

const api_key = import.meta.env.VITE_SOME_KEY;

const baseUrl = `https://api.openweathermap.org/data/2.5/weather?&units=metric&appid=${api_key}`;

const getMeteorology = (lat, lon) => {
  const request = axios.get(`${baseUrl}&lat=${lat}&lon=${lon}`);
  return request.then((response) => response.data);
};

export default { getMeteorology };
