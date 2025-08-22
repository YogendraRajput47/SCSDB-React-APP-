import React from "react";
import notFound from "../assets/notfound.mp4";
import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {

    const navigate=useNavigate();

  return (
    <div className="absolute w-full h-screen flex items-center justify-center top-0 left-0 z-100 bg-[rgba(0,0,0,0.9)] gap-x-10">
      <Link
        onClick={() => navigate(-1)}
        className="absolute hover:text-[#6656CD] ri-close-fill mr-2 top-2 right-5 z-10 text-3xl text-white"
      ></Link>
      <video
        src={notFound}
        autoPlay
        loop
        muted
        className=" h-[50%] object-cover"
      />
      <h1 className="text-4xl text-white">Not Found</h1>
    </div>
  );
};

export default NotFound;
