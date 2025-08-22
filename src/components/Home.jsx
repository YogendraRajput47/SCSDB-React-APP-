import React, { useEffect, useState } from "react";
import SideNavbar from "./partials/SideNavbar";
import TopNavbar from "./partials/TopNavbar";
import axios from "../utils/axios";
import Header from "./partials/Header";
import HorizontalCards from "./partials/HorizontalCards";
import Dropdown from "./partials/Dropdown";
import Loading from "./Loading";

const Home = () => {
  document.title = "SCSDB | Homepage";

  const [wallpaper, setWallpaper] = useState(null);
  const [trending, setTrending] = useState([]);
  const [category, setCategory] = useState("all")

  const getHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      // console.log(data);
      let randomData =
        data.results[(Math.random() * (data.results.length - 1)).toFixed()];
      setWallpaper(randomData);
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const getTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);
      // console.log(data);
      setTrending(data.results)
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const func=(e)=>{
    setCategory(e.target.value)
  }
  // console.log(wallpaper)

  useEffect(() => {
    !wallpaper && getHeaderWallpaper();
     getTrending();
  }, [category]);



  // console.log(trending);
  return wallpaper && trending ? (
    <>
      <SideNavbar />
      <div className="w-[80%] h-full overflow-auto overflow-x-hidden">
        <TopNavbar />
        <Header data={wallpaper} />

        <div className="px-5  mt-4 flex justify-between items-center pb-5">
          <h1 className=" text-3xl text-zinc-400 font-semibold">Trending</h1>
          <Dropdown
            title="Filter"
            options={["tv", "movie", "all"]}
            func={func}
          />
        </div>

        <HorizontalCards data={trending} />
      </div>
    </>
  ) : (
    <Loading/>
  );
};

export default Home;
