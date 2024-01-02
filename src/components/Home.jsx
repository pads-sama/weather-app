import React, { useRef, useState } from "react";
import { SearchBlack } from "../assets";

const Home = () => {
  //watch the input change
  const inputLocationInitialValue = {
    input_city: "",
  };
  const [locationValue, setLocationValue] = useState(inputLocationInitialValue);

  const handleChange = (e) => {
    const { name, value } = e.target;
    //prevLocation represent the current state.
    //used the spread operator (...) create copy of the current state without modefying the current state
    //it create a new copy with the same values
    //the [name]:value is the part that is being updated. the [name] is use to
    //dyamically represent the property name(name attributes in html)
    //it means that the property with this name will update the its value with the value variable
    setLocationValue((prevLocationValue) => ({
      ...prevLocationValue,
      [name]: value,
    }));
  };

  //fetch data from the api
  const [weatherData, setWeatherData] = useState([]);
  const [error, setError] = useState(null);
  const [isDay, setIsDay] = useState(false);
  const [isLoading, setIsLoading] = useState("false");
  const api_key = "ef6d01f76f6ea84a6c41460f4989b1f3";

  const fetchWeatherData = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${api_key}`;
      const response = await fetch(url);
      const weather = await response.json();
      setWeatherData(weather);

      const sunrise = weather.sys.sunrise;
      const sunset = weather.sys.sunset;
      const timestamp = weather.dt * 1000;
      const dateObject = new Date(timestamp);
      const currentTime = dateObject.getTime();

      if (currentTime > sunrise * 1000 && currentTime < sunset * 1000) {
        setIsDay(true);
      } else {
        setIsDay(false);
      }

      return weather;
    } catch (error) {
      setError("City not found! city is not being passed in the url");
    } finally {
      setIsLoading(false);
    }
  };

  ///format date
  const formatDate = (timestamp, dateObject, timeZone) => {
    timestamp = weatherData.dt * 1000;
    timeZone = weatherData.timezone;
    dateObject = new Date(timestamp);

    const options = { weekday: "long", month: "long", day: "numeric" };
    const formattedDate = dateObject.toLocaleDateString(timeZone, options);
    return formattedDate;
  };

  //handle search
  const [location, setLocation] = useState("");
  const [wind, setWind] = useState("");
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  const [condition, setCondition] = useState("");
  const [feelsLike, setFeelsLike] = useState("");
  const [date, setDate] = useState("");

  const inputRef = useRef(null);

  const handleSearch = async () => {
    const weather = await fetchWeatherData(inputRef.current.value);
    setLocation(weather.name);
    setWind(weather.wind.speed + "K/M");
    setTemperature(weather.main.temp + "°C");
    setHumidity(weather.main.humidity + "%");
    setCondition("|" + weather.weather[0].description);
    setDate(formatDate(weather.dt, weather.timezone));
    setFeelsLike(weather.main.feels_like + "°C");
    // console.log(weather);
  };

  return (
    <div
      className="morning_bg
       transition text-lg relative text-white tracking-widest py-14 px-5 grid grid-rows-[100px_minmax(200px,_1fr)100px] overflow-hidden h-[100dvh] | md:px-20 | xl:px-40 xl:h-[100dvh] xl:py-10 xl:grid-rows-[150px_minmax(200px,_1fr)50px]"
    >
      <div className="w-full h-auto  py-3 flex justify-center row-span-1 xl:text-xl z-10">
        <div className="w-full flex justify-center">
          <div className="w-full h-10 bg-white flex items-center transition px-5 py-2 gap-2 rounded-full shadow-2xl | md:w-[60%] | xl:w-[40%]">
            <button className="w-8 h-8" onClick={handleSearch}>
              <img src={SearchBlack} alt="magnifying glass image" />
            </button>
            <input
              ref={inputRef}
              type="text"
              name="input_city"
              id="input_city"
              className="input_location text-sm bg-transparent text-gray-500 border-l-2 border-gray-500 outline-none w-full h-full px-2"
              placeholder="Search location..."
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      {weatherData && (
        <>
          <div className=" row-span-2">
            <div className="block space-y-10 transition | md:h-20 md:flex md:justify-between md:items-center md:space-y-0 | xl:h-20 xl:flex xl:justify-between xl:items-center xl:space-y-0 ">
              <div className="uppercase">
                <h1 className="location text-5xl font-semibold transition | md:text-7xl | xl:text-8xl">
                  {location}
                </h1>
                <p className="date transition">{date}</p>
              </div>
              <div className="uppercase transition text-3xl font-thin | xl:text-4xl ">
                <span className={`day ${isDay ? "block" : "hidden"}`} id="day">
                  {isDay ? "day time" : "night time"}
                </span>
                <span> </span>
                <span className="condition">{condition}</span>
              </div>
            </div>
          </div>
          <div className="uppercase space-y-10">
            <div className="">
              <div className="temperature text-8xl transition | xl:text-9xl">
                {temperature}
              </div>
              <p className="feels_like">{feelsLike}</p>
            </div>
            <div className="flex tracking-widest font-thin">
              <div className="flex flex-col pr-10 items-center border-r">
                <div className=""></div>
                <p className="humidity_percentage">{humidity}</p>
              </div>
              <div className="flex flex-col px-10 items-center">
                <div></div>
                <p className="wind_rate">{wind}</p>
              </div>
            </div>
          </div>
        </>
      )}
      <div className=" bg-gradient-to-t from-[#0c0c1d] to-[#111134]/40 h-full w-full absolute inset-0 -z-[1]"></div>
    </div>
    // <div className="FetchData">
    //   <h1>Fetch Weather Data</h1>
    //   <input
    //     ref={inputRef}
    //     type="text"
    //     name="input_city"
    //     className="input_city"
    //     placeholder="Enter a city"
    //     onChange={handleChange}
    //   />
    //   <button onClick={handleSearch}>Search</button>
    //   {isLoading && <p>Loading...</p>}
    //   {error && <p>Error: {error}</p>}
    //   {weatherData && (
    //     <div className="weather_info">
    //       <p className="location">{location}</p>
    //       <p className="wind_rate">{wind}</p>
    //       <p className="temperature">{temperature}</p>
    //       <p className="humidity_percentage">{humidity}</p>
    //       <p className="condition">{condition}</p>
    //       <p className="feels_like">{feelsLike}</p>
    //       <p className="date">{date}</p>
    //     </div>
    //   )}
    // </div>
  );
};

export default Home;
