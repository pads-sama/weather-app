import React from "react";
import Weather from "../Weather/Weather";
import WeekContainer from "../Weeks/WeekContainer";
import "./Home.css";

const Home = () => {
  return (
    <>
      <div className=" relative text-white ">
        <div className="home_container "></div>
        <div className="p-5">
          <Weather />
          <WeekContainer />
        </div>
      </div>
    </>
  );
};

export default Home;
