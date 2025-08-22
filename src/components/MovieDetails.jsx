import React, { useEffect } from "react";
import { asyncLoadMovie, removeMovie } from "../store/actions/movieActions";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import HorizontalCards from "./partials/HorizontalCards";

const MovieDetails = () => {
  const { info } = useSelector((state) => state.movie);
  // console.log(info);

  const { pathname } = useLocation();

  const navigate = useNavigate();

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncLoadMovie(id));

    return () => {
      dispatch(removeMovie());
    };
  }, [id]);

  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,.7), rgba(0,0,0,.9)),
      url(https://image.tmdb.org/t/p/original/${info.details?.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="w-full px-[10%] relative"
    >
      {/* Part-1 Navigation */}
      <nav className="w-full h-[10vh] text-zinc-100 flex items-center gap-10 text-xl ">
        <Link
          onClick={() => navigate(-1)}
          className=" hover:text-[#6656CD] ri-arrow-left-line mr-2"
        ></Link>
        <a href={info.details.homepage} target="_blank">
          <i className="ri-external-link-fill"></i>
        </a>

        <a
          href={`https://www.wikidata.org/wiki/${info.externalId.wikidata_id}`}
          target="_blank"
        >
          <i className="ri-earth-fill"></i>
        </a>
        <a
          href={`https://www.imdb.com/title/${info.externalId.imdb_id}/`}
          target="_blank"
        >
          imdb
        </a>
      </nav>

      {/* Part-2 Poster and details */}
      <div className="w-full flex   items-center">
        <img
          src={`https://image.tmdb.org/t/p/original/${
            info.details.poster_path || info.details.backdrop_path
          }`}
          alt=""
          className="h-[70vh] object-cover shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)]"
        />

        <div className="content ml-[5%] text-white">
          <h1 className="text-5xl  font-black">
            {info.details.original_name ||
              info.details.original_title ||
              info.details.name ||
              info.details.title}

            <small className="text-2xl font-bold text-zinc-200">
              ({info.details.release_date.split("-")[0]})
            </small>
          </h1>

          <div className="flex items-center gap-x-3 text-2xl font-semibold mt-3 mb-5">
            <span className="  text-white text-2xl font-semibold w-10 h-10 flex justify-center items-center bg-yellow-600 rounded-full p-6">
              {(info.details.vote_average * 10).toFixed()}
              <sup>%</sup>
            </span>

            <h1 className="w-[60px] font-semibold leading-6">User Score</h1>
            <h1>| ({info.details.release_date})</h1>
            <h1>| {info.details.genres.map((g, i) => g.name).join(",")}</h1>
            <h1>| {info.details.runtime}min</h1>
          </div>

          <h1 className="text-zinc-200 text-xl font-semibold italic">
            {info.details.tagline}
          </h1>
          <h1 className="text-2xl mt-5 mb-3">Overview</h1>
          <p>{info.details.overview}</p>
          <h1 className="text-2xl mt-5 mb-3">Movie Translated</h1>
          <p className="mb-10">{info.translations.join(", ")}</p>

          <Link
            className=" px-5 py-4  bg-[#6556CD] rounded-lg"
            to={`${pathname}/trailer`}
          >
            <i className="ri-play-fill text-xl mr-3"></i>
            Play Trailer
          </Link>
        </div>
      </div>

      {/* Part-3 Availabel on Platform  */}
      <div className="w-[80%] flex flex-col gap-y-5 mt-10 mb-4">
        {info.watchProviders && info.watchProviders.flatrate && (
          <div className="flex gap-x-10 items-center text-white">
            <h1>Availabel on Platform</h1>
            {info.watchProviders.flatrate.map((w, i) => (
              <img
                title={w.provider_name}
                key={i}
                className="w-[5vh] h-[5vh] object-cover rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
              />
            ))}
          </div>
        )}

        {info.watchProviders && info.watchProviders.rent && (
          <div className="flex gap-x-10 items-center text-white">
            <h1>Availabel on Rent</h1>
            {info.watchProviders.rent.map((w, i) => (
              <img
                key={i}
                title={w.provider_name}
                className="w-[5vh] h-[5vh] object-cover rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
              />
            ))}
          </div>
        )}

        {info.watchProviders && info.watchProviders.buy && (
          <div className="flex gap-x-10 items-center text-white">
            <h1>Availabel to Buy</h1>
            {info.watchProviders.buy.map((w, i) => (
              <img
                key={i}
                title={w.provider_name}
                className="w-[5vh] h-[5vh] object-cover rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
              />
            ))}
          </div>
        )}
      </div>

      {/*Part-4 Recommendations and Similar Stuff  */}
      <hr className="mt-10 mb-5 border-none h-[2px] bg-zinc-500" />
      <h1 className="text-3xl font-bold text-white mb-4 ">
        Recommendations & Similar Stuff
      </h1>
      <HorizontalCards
        data={
          info.recommendations.length > 0 ? info.recommendations : info.similar
        }
      />
      <Outlet />
    </div>
  ) : (
    <Loading />
  );
};

export default MovieDetails;
