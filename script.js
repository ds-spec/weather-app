const cityInput = document.querySelector("#city");
const search = document.querySelector("#search");

console.log(cityInput.value, "cityInputcityInput");

let cityValue;

async function fetchWeather(city) {
  const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${city}`;
  console.log(url, "urlsssssss");
  const headers = {
    "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
    "x-rapidapi-key": "51f1db3ce9mshd405dea192914c1p15e20ajsn810edad40d8a",
  };

  try {
    const response = await fetch(url, { headers });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(
      "Error fetching the weather details for your location: " + error.message
    );
  }
}

const getWeather = (condition) => {
  switch (condition.toLowerCase()) {
    case "sunny":
      return "images/clear.png";
    case "snow":
      return "images/snow.png";
    case "rain":
      return "images/rain.png";
    case "mist":
      return "images/mist.png";
    case "drizzle":
      return "images/drizzle.png";
    case "cloudy":
      return "images/cloudy.png";
    case "clear":
      return "images/clear.png";
    case "winter":
      return "images/winter.png";
    default:
  }
};

const displayWeather = (data) => {
  console.log(data);
  const weatherCondition = data?.current?.condition?.text;
  const weatherConditionText = getWeather(weatherCondition);
  console.log(weatherConditionText);
  console.log(weatherCondition);
  document.querySelector("#weather-info").innerHTML = `
          <img src=${weatherConditionText} alt="" />
          <div id="weather-text">
            <h1>${data?.current?.temp_c}&deg;C</h1>
            <h2>${data?.location?.name}</h2>
          </div>
  `;
  document.querySelector("#weather-pressure").innerHTML = `
  <div class="weather">
            <img src="images/humidity.png" alt="" />
            <div class="weather-text">
              <h4>${data?.current?.humidity}%</h4>
              <h6>Humidity</h6>
            </div>
          </div>
          <div class="weather">
            <img src="images/wind.png" alt="" />
            <div class="weather-text">
              <h4>${data?.current?.wind_kph} km/h</h4>
              <h6>Wind Speed</h6>
            </div>
          </div>
  `;
};

search.addEventListener("click", async () => {
  const cityValue = cityInput?.value?.trim();
  console.log("cityyyy", cityInput.value);
  if (cityValue) {
    const data = await fetchWeather(cityValue);
    displayWeather(data);
    cityInput.value = "";
  }
});
