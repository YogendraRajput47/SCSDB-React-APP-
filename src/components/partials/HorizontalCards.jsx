import React from "react";
import { Link } from "react-router-dom";
import noimage from "../../assets/noimage.png"

const HorizontalCards = ({ data }) => {
  // console.log(data)
  return (
    <div className="w-full overflow-x-auto flex gap-x-4 flex-nowrap mb-2 px-5">
      {data.length > 0 ? (
        data.map((d, i) => (
          <div
            key={i}
            className="w-64 h-[50vh] bg-zinc-900 flex-shrink-0 mb-2 rounded overflow-hidden bg-red-"
          >
            {/* Whole card is clickable */}
            <Link to={`/${d.media_type}/details/${d.id}`}>
              <div className="w-full h-1/2 bg-green-600">
                <img
                  src={d.backdrop_path || d.profile_path || d.poster_path ? `https://image.tmdb.org/t/p/original/${
                    d.backdrop_path || d.profile_path || d.poster_path 
                  }`:noimage}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <h1 className="text-white font-semibold text-xl p-2">
                {d.original_name || d.original_title || d.name || d.title}
              </h1>
            </Link>

            {/* Overview + More link */}
            <p className="text-white p-2 mb-4">
              {d.overview.slice(0, 50)}...
              <Link
                to={`/${d.media_type}/details/${d.id}`}
                className="text-zinc-500 ml-1"
              >
                more
              </Link>
            </p>
          </div>
        ))
      ) : (
        <h1 className="text-3xl text-white font-black text-center  mt-5">
          Nothing to Show
        </h1>
      )}
    </div>
  );
};

export default HorizontalCards;
