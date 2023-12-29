import React from "react";
import "./Weather.css";
import Forms from "../Forms/Forms";

const Weather = () => {
  return (
    <div className="grid | gap-5 xl:grid-cols-3">
      <div className="z-10 w-full transition | md:w-96 | xl:w-96">
        <div className="form_container shadow-xl w-full h-60 rounded-3xl px-5 py-5 | xl:h-64">
          <div className="pb-5 text-center">
            <h1 className="text-2xl font-bold tracking-wide xl:text-4xl">
              Weatheria
            </h1>
          </div>
          <Forms />
        </div>
      </div>
      <div className="weather_search_result h-96 xl:col-span-2 p-5">
        <div className="relative w-full">
          <p className="absolute right-0 top-0">Raining</p>
          <p>Location: Manila</p>
          <p>Temperature: 90deg C</p>
          <p>Wind: 100kph</p>
          <p>Humidity: wet</p>
        </div>
      </div>
    </div>
  );
};

export default Weather;
