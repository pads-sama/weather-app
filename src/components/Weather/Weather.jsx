import React from "react";
import "./Weather.css";
import Forms from "../Forms/Forms";
import { Sunny } from "../../assets";

const Weather = () => {
  return (
    <div className="grid relative transition | gap-5 xl:grid-cols-3">
      <div className="z-10 w-full transition | md:w-96 | xl:w-96">
        <div className="form_container shadow-xl w-full h-60 rounded-3xl px-5 py-5 | xl:h-64">
          <div className="pb-5 text-center">
            <h1 className="text-2xl font-bold tracking-wide | xl:text-4xl">
              Weatheria
            </h1>
          </div>
          <Forms />
        </div>
      </div>
      <div className="weather_search_result h-96 grid grid-rows-3 xl:col-span-2 p-5">
        <div className="relative w-full ">
          <p>
            Mostly sunny with 0 m/s winds from the North and a temparature of
            24°C
          </p>

          <span className="text-sm">
            <p className="text-3xl">Manila</p>
            <p>5:50AM | FRI, December 30</p>
          </span>
        </div>
        <div className="w-full flex ">
          <div>
            <p className="text-6xl font-bold relative"> 24°</p>
            <p className="">Mostly Sunny</p>
          </div>
          <img
            className="w-52 h-52 absolute right-0 top-16"
            src={Sunny}
            alt="sun and cloud image"
          />
        </div>
        <div className=" relative">
          <div className="weather_data text-sm absolute bottom-5 flex justify-around items-center h-[60%] rounded-xl border border-[#ffffff80] bg-[#f1f1f11a] w-full transition | xl:w-96">
            <p>Wind: 100kph</p>
            <p className="text-3xl font-thin">|</p>
            <p>Humidity: wet</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
