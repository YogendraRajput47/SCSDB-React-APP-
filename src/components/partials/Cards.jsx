import React from "react";
import { Link, useLocation } from "react-router-dom";
import noimage from "../../assets/noimage.png";

const Cards = ({ data, title }) => {
  // console.log(data);
  // console.log(title)

  return (
    <div className="w-full mt-6 flex gap-x-20 flex-wrap px-16">
      {data.map((d, i) => (
        <Link
          to={`/${d.media_type || title}/details/${d.id}`}
          key={i}
          className="lg:mb-12 h-[60vh] "
        >
          <div className="w-60 h-full relative ">
            <div className="w-full  ">
              <img
                src={
                  d.poster_path ||
                  d.backdrop_path ||
                  d.profile_path ?`https://image.tmdb.org/t/p/original/${
                    d.poster_path ||
                    d.backdrop_path ||
                    d.profile_path ||
                    "zNriRTr0kWwyaXPzdg1EIxf0BWk.jpg"
                  }`:noimage
                }
                alt=""
                className="w-full h-full object-cover shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)]"
              />
            </div>
            <h1 className="text-2xl text-zinc-400  font-semibold mt-1">
              {d.original_name || d.original_title || d.name || d.title}
            </h1>

            {d.vote_average && (
              <div className="absolute -right-6  lg:bottom-44  text-white text-2xl font-semibold w-10 h-10 flex justify-center items-center bg-yellow-600 rounded-full p-6">
                {(d.vote_average * 10).toFixed()}
                <sup>%</sup>
              </div>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Cards;
