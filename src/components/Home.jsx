import React from "react";
import { Search, SearchBlack, Sunny } from "../assets";

const Home = () => {
  //api key in openweather accout
  const api_key = "ef6d01f76f6ea84a6c41460f4989b1f3";

  const search = async () => {
    const inputLocation = document.getElementsByClassName("input_location");
    if (inputLocation[0].value === "") {
      return 0;
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputLocation[0].value}&units=Metric&appid=${api_key}`;

    const response = await fetch(url);
    const data = await response.json();

    const timestamp = data.dt * 1000; // Convert seconds to milliseconds
    const dateObject = new Date(timestamp);

    const day = data.sys.sunrise;
    const night = data.sys.sunset;

    const timeZone = data.timezone;

    const options = { weekday: "long", month: "long", day: "numeric" };
    const formattedDate = dateObject.toLocaleDateString(timeZone, options);

    if (formattedDate > day && formattedDate < night) {
      document.getElementById("day").innerText = "Morning";
    } else {
      document.getElementById("day").innerText = "night";
    }

    const location = document.getElementsByClassName("location");
    const wind = document.getElementsByClassName("wind_rate");
    const temperature = document.getElementsByClassName("temperature");
    const humidity = document.getElementsByClassName("humidity_percentage");
    const condition = document.getElementsByClassName("condition");
    const feels_like = document.getElementsByClassName("feels_like");
    const date = document.getElementsByClassName("date");

    location[0].innerHTML = data.name;
    wind[0].innerHTML = data.wind.speed + "K/M";
    temperature[0].innerHTML = data.main.temp + "°C";
    humidity[0].innerHTML = data.main.humidity + "%";
    condition[0].innerHTML = data.weather[0].description;
    feels_like[0].innerHTML = "Feels like " + data.main.feels_like + "°C";
    date[0].innerHTML = formattedDate;
  };

  return (
    <div className="home_container transition text-lg text-white tracking-widest py-14 px-5 grid grid-rows-[100px_minmax(200px,_1fr)100px] overflow-hidden h-[100dvh] | md:px-20 | xl:px-40 xl:h-[100dvh] xl:py-10 xl:grid-rows-[150px_minmax(200px,_1fr)50px]">
      <div className="w-full h-auto  py-3 flex justify-center row-span-1 xl:text-xl ">
        <div className="w-full flex justify-center">
          <div className="w-full h-10 bg-white flex items-center transition px-5 py-2 gap-2 rounded-full shadow-2xl | md:w-[60%] | xl:w-[40%]">
            <button
              className="w-8 h-8"
              onClick={() => {
                search();
              }}
            >
              <img src={SearchBlack} alt="magnifying glass image" />
            </button>
            <input
              type="text"
              name="input_location"
              id="input_location"
              className="input_location text-sm bg-transparent text-gray-500 border-l-2 border-gray-500 outline-none w-full h-full px-2"
              placeholder="Search location..."
            />
          </div>
        </div>
      </div>
      <div className=" row-span-2">
        <div className="block space-y-10 transition | md:h-20 md:flex md:justify-between md:items-center md:space-y-0 | xl:h-20 xl:flex xl:justify-between xl:items-center xl:space-y-0 ">
          <div className="uppercase">
            <h1 className="location text-5xl font-semibold transition | md:text-7xl | xl:text-8xl">
              New York
            </h1>
            <p className="date transition">Wednesday, 1 April</p>
          </div>
          <div className="uppercase transition text-3xl font-thin | xl:text-4xl ">
            <span className="day" id="day">
              Night
            </span>
            <span> | </span>
            <span className="condition">Cloudy</span>
          </div>
        </div>
      </div>
      <div className="uppercase space-y-10">
        <div className="">
          <div className="temperature text-8xl transition | xl:text-9xl">
            12°C
          </div>
          <p className="feels_like">Cloudy</p>
        </div>
        <div className="flex tracking-widest font-thin">
          <div className="flex flex-col pr-10 items-center border-r">
            <div className="">Humidity</div>
            <p className="humidity_percentage">64%</p>
          </div>

          <div className="flex flex-col px-10 items-center">
            <div>Wind</div>
            <p className="wind_rate">12K/M</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
