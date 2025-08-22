import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../utils/axios";
import noimage from "../../assets/noimage.png"

const TopNavbar = () => {
  const [query, setQuery] = useState("");
  // console.log(query);
  const [searches, setSearches] = useState([]);

  const getSearches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setSearches(data.results);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    getSearches();
  }, [query]);

  return (
    <div className="w-[80%]  mx-auto  h-[10vh]  relative flex justify-start items-center">
      <i className="text-zinc-400 text-3xl ri-search-line"></i>
      <input
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        className="w-[50%] mx-10 p-3 outline-none border-none bg-transparent text-xl text-zinc-200"
        type="text"
        placeholder="search anything"
      />
      {query.length > 0 && (
        <i
          onClick={() => setQuery("")}
          className="text-zinc-400 text-3xl ri-close-fill"
        ></i>
      )}

      <div className="w-[50%] z-50 max-h-[50vh] absolute top-[100%] left-[8%] bg-zinc-200 overflow-auto rounded ">
        {searches.map((s, i) => {
          return (
            <Link
            to={`/${s.media_type}/details/${s.id}`}
              key={i}
              className="border-zinc-100 text-zinc-600 font-semibold hover:bg-zinc-300 hover:text-black p-10 w-full  flex justify-start items-center border-b-2  "
            >
              <img
                className="w-[10vh] h-[10vh] object-cover rounded mr-5 shadow-lg"
                src={s.backdrop_path || s.profile_path ?`https://image.tmdb.org/t/p/original${
                  s.backdrop_path || s.profile_path
                }`:noimage}
                alt=""
              />
              <span>{s.original_name || s.original_title || s.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TopNavbar;
