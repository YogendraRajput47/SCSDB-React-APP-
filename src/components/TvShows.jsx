import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import Loading from "./Loading";
import TopNavbar from "./partials/TopNavbar";
import Dropdown from "./partials/Dropdown";
import InfiniteScroll from "react-infinite-scroll-component";
import Cards from "./partials/Cards";

const TvShows = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("airing_today");
  const [tv, setTv] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  document.title = "SCSDB || Tv Shows " ;

  const getTv = async () => {
    try {
      const { data } = await axios.get(`/tv/${category}?page=${page}`);
      if (data.results.length > 0) {
        setTv((prevState) => [...prevState, ...data.results]);
        setPage(page + 1);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.log("Error:", err);
    }
  };

  function refreshHandler() {
    if (tv.length === 0) {
      getTv();
    } else {
      setPage(1);
      setTv([]);
      getTv();
    }
  }

  useEffect(() => {
    refreshHandler();
  }, [category]);

    return tv.length > 0 ? (
      <div className="px-20 pt-3 w-full h-full ">
        <div className="w-full flex items-center justify-between">
          <h1 className="text-2xl text-zinc-400 font-semibold ">
            <i
              onClick={() => navigate(-1)}
              className=" hover:text-[#6656CD] ri-arrow-left-line mr-2"
            ></i>
            Tv Shows
            <small className="text-sm ml-2 text-zinc-600">({category})</small>
          </h1>

          <div className="flex items-center gap-x-5 w-[80%]">
            <TopNavbar />
            <Dropdown
              title="Category"
              options={["popular", "top_rated", "on_the_air", "airing_today"]}
              func={(e) => setCategory(e.target.value)}
            />
          </div>
        </div>

        <InfiniteScroll
          dataLength={tv.length}
          next={getTv}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
        >
          <Cards data={tv} title="tv" />
        </InfiniteScroll>
      </div>
    ) : (
      <Loading />
    );
};

export default TvShows;
