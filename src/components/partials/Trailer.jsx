import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NotFound from "../NotFound";

const Trailer = () => {
  const { pathname } = useLocation();
  const navigate=useNavigate();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytvideo = useSelector((state) => state[category].info.videos);

//   console.log(ytvideo.key);

  return ytvideo && ytvideo.key ? (
    <div className="absolute w-full h-screen flex items-center justify-center top-0 left-0 z-100 bg-[rgba(0,0,0,0.9)]">
      <Link
        onClick={() => navigate(-1)}
        className="absolute hover:text-[#6656CD] ri-close-fill mr-2 top-2 right-5 z-10 text-3xl text-white"
      ></Link>
      <ReactPlayer
        height={600}
        width={1400}
        controls={true}
        playing={false}
        src={`https://www.youtube.com/watch?v=${ytvideo.key}`}
      />
    </div>
  ) :<NotFound/>;
};

export default Trailer;
