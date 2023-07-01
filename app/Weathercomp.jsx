"use client";
import { CiLocationOn, CiTempHigh } from "react-icons/ci";
import { useRouter } from "next/navigation";
import {
  BsCloudHaze2,
  BsFillCloudsFill,
  BsCloudRainHeavyFill,
  BsArrowUp,
} from "react-icons/bs";
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { IoStopwatchOutline } from "react-icons/io5";
import { WiHumidity } from "react-icons/wi";

function Weathercomp() {
  const [city, setcity] = useState("");
  const [data, setdata] = useState();
const router  = useRouter();
  const [dis, setdis] = useState(true);
  const handelchange = (e) => {
    setcity(e.target.value);
    if (city.length > 0) {
      setdis(false);
    }
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      let url1 = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${process.env.NEXT_PUBLIC_API_KET}&lang=en`;
      const fetchdata = async () => {
        const res = await fetch(url1).then((r) => r.json());

        if (res.cod === 200) {
          setdata(res);
          console.log("direct", res);
          setcity(res.name);
        }
      };
      fetchdata();
    });
  }, []);

  const showdata = async () => {
    console.log(city);
    setdata();

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${
      city + ",IN"
    }&appid=${process.env.NEXT_PUBLIC_API_KET}`;
    const res = await fetch(url).then((r) => r.json());
    if (res.cod === 200) {
      setdata(res);
      console.log("city", res,res.wind.deg);

      setcity("");
      router.push('/')
      
    }
  };
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const date = new Date();

  return (
    <>
      <div className="logo mb-16 p-2 flex items-center space-x-1">
        <img src="./cloudy.png" alt="logo" className="w-7 h-6 " />
        <span className="text-2xl font-semibold text-cyan-500">WEATHER</span>
        <span className="text-2xl font-semibold  text-orange-500">x</span>
      </div>
      <form className="flex items-center mx-auto w-80 md:w-[800px] pb-3 justify-center space-x-2">
        <input
          type="text"
          autoComplete="true"
          placeholder="enter your city"
          value={city}
          name="city"
          onChange={handelchange}
          className="p-2 rounded w-full bg-transparent focus:outline-none border-b-2 border-green-300 text-white font-semibold"
        />
        <button
          disabled={dis}
          type="button"
          className=" disabled:opacity-50 hover:bg-green-200 text-orange-500 hover:text-green-600 bg-cyan-200 p-2 rounded"
        >
          <FaSearch
            onClick={() => {
              showdata();
            }}
            className=" text-xl cursor-pointer "
          />
        </button>
      </form>
      <div className="flex">
        <div className="backdrop-blur-sm  bg-black/30 w-80 md:w-[800px] h-96 md:h-[450px] m-auto p-10  rounded ">
          {data && (
            <div className=" p-4 space-y-2 text-justify ">
              <div className="top flex items-center justify-center">
                {data.weather[0].main == "Haze" && (
                  <BsCloudHaze2 className="text-6xl  text-slate-400" />
                )}
                {data.weather[0].main == "Clouds" && (
                  <BsFillCloudsFill className="text-6xl  text-slate-400" />
                )}
                {data.weather[0].main == "Rains" && (
                  <BsCloudRainHeavyFill className="text-6xl  text-slate-400" />
                )}
              </div>

              <div className=" md:float-left heading flex justify-center items-center space-x-2 text-2xl font-bold text-cyan-200 ">
                <div className="flex justify-center items-center">
                  <CiLocationOn /> <span>{data.name} </span>
                </div>
              </div>

              <div className="md:float-right  heading   space-x-2 heading text-2xl text-justify font-bold text-cyan-200 ">
                <div className="flex items-center justify-center">
                  <CiTempHigh className="text-2xl" />{" "}
                  <span>{(data.main.temp - 272.15).toFixed(2)} °C</span>
                </div>
                <div className="text-[0.70rem] text-orange-400 text-center">
                  feels like - {(data.main.feels_like - 272.15).toFixed(2)} °C
                </div>
                <div className="pressure flex items-center text-justify justify-center text-xl">
                  <IoStopwatchOutline className="text-2xl" />
                  <span>{data.main.pressure} mbar</span>
                </div>
                <div className="pressure flex items-center justify-center text-xl text-justify">
                  <WiHumidity className="text-2xl" />
                  <span>{data.main.humidity} %</span>
                </div>
              </div>
              <div className="absolute  left-1 bottom-10 text-md text-cyan-400 p-3 flex space-x-2 items-center "><BsArrowUp className={`transform-gpu rotate-[${(data.wind.deg).toString()}deg]`}/> <span>{data.wind.speed} meter/sec</span></div>
              <div className="text-[0.65rem] left-12 bottom-9 text-cyan-100 absolute">Direction - {data.wind.deg} Deg</div>
              <div className="absolute  left-1 bottom-0 text-sm text-cyan-400 p-3 flex justify-evenly space-x-4">
                {data &&<div>Date - {date.toLocaleDateString('en-IN',options)} {("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2)}</div>}
               
              </div>
            </div>
          )}
        </div>
      </div>

    </>
  );
}

export default Weathercomp;
