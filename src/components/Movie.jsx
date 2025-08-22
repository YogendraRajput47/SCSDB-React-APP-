import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import Loading from "./Loading";
import TopNavbar from "./partials/TopNavbar";
import Dropdown from "./partials/Dropdown";
import InfiniteScroll from "react-infinite-scroll-component";
import Cards from "./partials/Cards";

const Movie = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("now_playing");
  const [movie, setMovie] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  document.title = "SCSDB || Movie ";


    const getMovies = async () => {
      try {
        const { data } = await axios.get(`/movie/${category}?page=${page}`);
        if (data.results.length > 0) {
          setMovie((prevState) => [...prevState, ...data.results]);
          setPage(page + 1);
        } else {
          setHasMore(false);
        }
      } catch (err) {
        console.log("Error:", err);
      }
    };

    function refreshHandler() {
      if (movie.length === 0) {
        getMovies();
      } else {
        setPage(1);
        setMovie([]);
        getMovies();
      }
    }

    useEffect(() => {
      refreshHandler();
    }, [category]);


   return movie.length > 0 ? (
     <div className="px-20 pt-3 w-full h-full ">
       <div className="w-full flex items-center justify-between">
         <h1 className="text-2xl text-zinc-400 font-semibold ">
           <i
             onClick={() => navigate("/")}
             className=" hover:text-[#6656CD] ri-arrow-left-line mr-2"
           ></i>
           Movie
           <small className="text-sm ml-2 text-zinc-600">({category})</small>
         </h1>

         <div className="flex items-center gap-x-5 w-[80%]">
           <TopNavbar />
           <Dropdown
             title="Category"
             options={["popular", "top_rated", "upcoming", "now_playing"]}
             func={(e) => setCategory(e.target.value)}
           />
         </div>
       </div>

       <InfiniteScroll
         dataLength={movie.length}
         next={getMovies}
         hasMore={hasMore}
         loader={<h4>Loading...</h4>}
       >
         <Cards data={movie} title="movie" />
       </InfiniteScroll>
     </div>
   ) : (
     <Loading />
   );
};

export default Movie;
