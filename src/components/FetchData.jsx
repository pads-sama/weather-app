import React, { useState } from "react";

const FetchData = () => {
  //api key from the openweather acc
  const api_key = "ef6d01f76f6ea84a6c41460f4989b1f3";

  //   const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeatherData = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${api_key}`;

    try {
      setIsLoading(true);
      const response = await fetch(url); //fetch data from the url
      const data = await response.json();
      //   setData(await response.json());
      return data;
    } catch (error) {
      setError("There was an error with your request.");
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (timestamp, dateObject, timeZone) => {
    timestamp = data.dt * 1000;
    timeZone = data.timezone;
    dateObject = new Date(timestamp);

    const options = { weekday: "long", month: "long", day: "numeric" };
    const formattedDate = dateObject.toLocaleDateString(timeZone, options);
    return formattedDate;
  };

  const [isDay, setIsDay] = useState("");

  const detemineDayOrNight = (sunrise, sunset) => {
    sunrise = data.sys.sunrise * 1000;
    sunset = data.sys.sunset * 1000;
    // timezone = data.timezone;
    currentDate = new Date();
    currentTimeStamp = currentDate.getTime();

    if (currentTime > sunrise && currentTime < sunset) {
      setIsDay("Day");
    } else {
      setIsDay("night");
    }
  };

  const search = async () => {
    const inputLocation = document.getElementsByClassName("input_location");
    if (!inputLocation || inputLocation.value === "") {
      return;
    }
    await fetchWeatherData(inputLocation.value);
    formatDate(data.dt, data.timezone);
    detemineDayOrNight(data.sys.sunrise, data.sys.sunset);

    // Define the state variables for the elements
    const [location, setLocation] = useState("");
    const [wind, setWind] = useState("");
    const [temperature, setTemperature] = useState("");
    const [humidity, setHumidity] = useState("");
    const [condition, setCondition] = useState("");
    const [feelsLike, setFeelsLike] = useState("");
    const [date, setDate] = useState("");

    //update the value of the elements with the data from the api
    setLocation(data.name);
    setWind(data.wind.speed + "K/M");
    setTemperature(data.main.temp + "°C");
    setHumidity(data.main.humidity + "%");
    setCondition("|" + data.weather[0].description);
    setFeelsLike("Feels Like: " + data.main.feels_like + "°C");
    setDate(formattedDate);
  };

  return <div>FetchData</div>;
};

export default FetchData;

//api key in openweather accout
const api_key = "ef6d01f76f6ea84a6c41460f4989b1f3";
// const [data, setData] = useState([]);
const [isDay, setIsDay] = useState(false);
const [isLoading, setIsLoading] = useState(false);

const fetchWeatherData = async (inputLocation) => {
  try {
    setIsLoading(true);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputLocation}&units=Metric&appid=${api_key}`;
    const response = await fetch(url);
    // setData(await response.json());
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error: ", error);
  } finally {
    setIsLoading(false);
  }
};

const search = async () => {
  const inputLocation = document.getElementsByClassName("input_location");
  if (!inputLocation || inputLocation.value === "") {
    return;
  }

  // setIsLoading(true);
  // const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputLocation[0].value}&units=Metric&appid=${api_key}`;
  // const response = await fetch(url);
  // const data = await response.json();
  const data = await fetchWeatherData(inputLocation.value);

  const timestamp = data.dt * 1000; // Convert seconds to milliseconds
  const dateObject = new Date(timestamp);

  const day = data.sys.sunrise;
  const night = data.sys.sunset;

  const timeZone = data.timezone;

  const options = { weekday: "long", month: "long", day: "numeric" };
  const formattedDate = dateObject.toLocaleDateString(timeZone, options);

  const currentTime = dateObject.getTime();

  if (currentTime > day * 1000 && currentTime < night * 1000) {
    document.getElementById("day").innerText = "Morning";
    setIsDay(true);
  } else {
    document.getElementById("day").innerText = "Night";
    setIsDay(false);
  }

  //get the elements using classnames
  const location = document.getElementsByClassName("location");
  const wind = document.getElementsByClassName("wind_rate");
  const temperature = document.getElementsByClassName("temperature");
  const humidity = document.getElementsByClassName("humidity_percentage");
  const condition = document.getElementsByClassName("condition");
  const feels_like = document.getElementsByClassName("feels_like");
  const date = document.getElementsByClassName("date");

  //update the value of the elements with the data from th e
  location[0].innerHTML = data.name;
  wind[0].innerHTML = data.wind.speed + "K/M";
  temperature[0].innerHTML = data.main.temp + "°C";
  humidity[0].innerHTML = data.main.humidity + "%";
  condition[0].innerHTML = "|" + data.weather[0].description;
  feels_like[0].innerHTML = "Feels like " + data.main.feels_like + "°C";
  date[0].innerHTML = formattedDate;
};

// if (isLoading) {
//   return <p>Loading...</p>;
// }

const [weatherData, setWeatherData] = useState([]);
const [error, setError] = useState(null);
const [isDay, setIsDay] = useState(false);
const [isLoading, setIsLoading] = useState("false");
const [location, setLocation] = useState("");
const [wind, setWind] = useState("");
const [temperature, setTemperature] = useState("");
const [humidity, setHumidity] = useState("");
const [condition, setCondition] = useState("");
const [feelsLike, setFeelsLike] = useState("");
const [date, setDate] = useState("");

const api_key = "ef6d01f76f6ea84a6c41460f4989b1f3";
// Function to get weather data based on user's location.

const inputInitialValue = {
  input_location: "",
};

const [inputLocation, setInputLocation] = useState(inputInitialValue);

const handleChange = (e) => {
  setInputLocation(() => e.target.input_value);
};

const handleSearch = async () => {
  // const inputLocation = document.getElementsByClassName("input_location");
  if (!inputLocation || inputLocation === "") {
    return;
  }

  const dataw = await fetchWeatherData(inputLocation);
  const formattedDate = formatDate(data.dt, data.timezone);

  setLocation(dataw.name);
  setWind(dataw.wind.speed + "K/M");
  setTemperature(dataw.main.temp + "°C");
  setHumidity(dataw.main.humidity + "%");
  setCondition("|" + dataw.main.feels_like + "°C");
  setDate(formattedDate);
  console.log(data.timezone);
};

const fetchWeatherData = async (inputLocation) => {
  try {
    setIsLoading(true);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputLocation}&units=Metric&appid=${api_key}`;
    const response = await fetch(url);
    const data = await response.json();
    setWeatherData(data);
    // console.log(weatherData.sys.sunrise);

    // detemineDayOrNight(data.sys.sunrise, data.sys.sunset, data.dt * 1000);

    const sunrise = data.sys.sunrise;
    const sunset = data.sys.sunset;
    const timestamp = data.dt * 1000;
    const dateObject = new Date(timestamp);
    const currentTime = dateObject.getTime();

    if (currentTime > sunrise * 1000 && currentTime < sunset * 1000) {
      // document.getElementById("day").innerText = "Morning";
      setIsDay(true);
      console.log("day");
    } else {
      // document.getElementById("day").innerText = "Night";
      setIsDay(false);
      console.log("night");
    }
  } catch (error) {
    setError("City not found! city is not being passed in the url");
  } finally {
    setIsLoading(false);
  }
};

//initialized the weather data
const data = weatherData;

const formatDate = (timestamp, dateObject, timeZone) => {
  timestamp = data.dt * 1000;
  timeZone = data.timezone;
  dateObject = new Date(timestamp);

  const options = { weekday: "long", month: "long", day: "numeric" };
  const formattedDate = dateObject.toLocaleDateString(timeZone, options);
  return formattedDate;
};
