import React from "react";
import { Link } from "react-router-dom";

const Header = ({ data }) => {
  // console.log(data.backdrop_path);
  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,.7), rgba(0,0,0,.9)),
         url(https://image.tmdb.org/t/p/original/${
           data.backdrop_path || data.profile_path
         })`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="w-full h-[60vh] flex flex-col justify-end items-start p-[5%]"
    >
      <h1 className="text-white font-black text-5xl w-[70%]">
        {data.original_name || data.original_title || data.name || data.title}
      </h1>
      <p className="text-white w-[70%] mt-3 mb-3">
        {data.overview.slice(0, 200)}...
        <Link
          to={`/${data.media_type}/details/${data.id}`}
          className="text-blue-400"
        >
          more
        </Link>
      </p>
      <p className="text-white ">
        <i className=" text-yellow-500 ri-megaphone-fill"></i>
        {data.release_date || "No Information"}
        <i className=" text-yellow-500 ri-album-fill ml-5"></i>
        {data.media_type.toUpperCase()}
      </p>
      <Link
        to={`${data.media_type}/details/${data.id}/trailer`}
        className="text-white px-4 py-3  bg-[#6556CD] mt-3 rounded-md
       hover:bg-[#6253c2]"
      >
        Watch Trailer
      </Link>
    </div>
  );
};

export default Header;
