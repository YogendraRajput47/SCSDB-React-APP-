import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TopNavbar from "./partials/TopNavbar";
import Dropdown from "./partials/Dropdown";
import axios from "../utils/axios";
import Cards from "./partials/Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const Trending = () => {
    const navigate = useNavigate();
    const [category, setCategory] = useState("all");
    const [duration, setDuration] = useState("day");
    const [trending, setTrending] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    document.title = "SCSDB || Trending ";

  const getTrending = async () => {
    try {
      const { data } = await axios.get(
        `/trending/${category}/${duration}?page=${page}`
      );

      if (data.results.length > 0) {
        setTrending((prevState) => [...prevState, ...data.results]);
        setPage(page + 1);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.log("Error:", err);
    }
  };

  function refreshHandler() {
    if (trending.length === 0) {
      getTrending();
    } else {
      setPage(1);
      setTrending([]);
      getTrending();
    }
  }

  useEffect(() => {
    refreshHandler();
  }, [category, duration]);

  //   console.log(trending);

  return trending.length > 0 ? (
    <div className="px-20 pt-3 w-full h-full ">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-2xl text-zinc-400 font-semibold ">
          <i
            onClick={() => navigate(-1)}
            className=" hover:text-[#6656CD] ri-arrow-left-line mr-2"
          ></i>
          Trending
        </h1>

        <div className="flex items-center gap-x-5 w-[80%]">
          <TopNavbar />
          <Dropdown
            title="Category"
            options={["tv", "movie", "all"]}
            func={(e) => setCategory(e.target.value)}
          />

          <Dropdown
            title="Duration"
            options={["week", "day"]}
            func={(e) => setDuration(e.target.value)}
          />
        </div>
      </div>

      <InfiniteScroll
        dataLength={trending.length}
        next={getTrending}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        <Cards data={trending} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Trending;
