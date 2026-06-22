const BASE_URL = "http://api.weatherapi.com/v1/";
const API_KEY = "9ea93fcec62d499e949134918261306";
const API_KEY_PARAM = `key=${API_KEY}`;

async function getCurrentWeather(location) {
  let url = `${BASE_URL}/current.json?${API_KEY_PARAM}&q=${location}`
  const response = await fetch(url);
  return response.json();
}

console.log(await getCurrentWeather("Chennai"));