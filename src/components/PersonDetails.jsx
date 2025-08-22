import React, { useEffect, useState } from "react";
import { asyncLoadPerson, removePerson } from "../store/actions/personActions";
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
import Dropdown from "./partials/Dropdown";

const PersonDetails = () => {
  const { info } = useSelector((state) => state.person);
  const [category, setCategory] = useState("movie");


  const navigate = useNavigate();

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncLoadPerson(id));

    return () => {
      dispatch(removePerson());
    };
  }, [id]);
  return info ? (
    <div className="px-[10%] w-full  ">
      {/* Part-1 navigation */}
      <nav className="w-full h-[10vh] text-zinc-100 flex items-center gap-10 text-xl ">
        <Link
          onClick={() => navigate(-1)}
          className=" hover:text-[#6656CD] ri-arrow-left-line mr-2"
        ></Link>
      </nav>

      <div className="w-full flex gap-x-10 ">
        {/* Part-2 left poster and details */}
        <div className="w-[20%] mb-10">
          <img
            src={`https://image.tmdb.org/t/p/original/${info.details.profile_path}`}
            alt=""
            className="w-full object-cover shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] "
          />
          <hr className="mt-10 mb-5 border-none h-[2px] bg-zinc-500 " />

          {/* Social Media Links */}
          <div className="text-2xl text-white flex gap-x-5">
            <a
              href={`https://www.wikidata.org/wiki/${info.externalId.wikidata_id}`}
              target="_blank"
            >
              <i className="ri-earth-fill"></i>
            </a>
            <a
              href={`https://www.facebook.com/${info.externalId.facebook_id}`}
              target="_blank"
            >
              <i className="ri-facebook-circle-fill"></i>
            </a>
            <a
              href={`https://www.instagram.com/${info.externalId.instagram_id}`}
              target="_blank"
            >
              <i className="ri-instagram-fill"></i>
            </a>
            <a
              href={`https://www.twitter.com/${info.externalId.twitter_id}`}
              target="_blank"
            >
              <i className="ri-twitter-x-fill"></i>
            </a>
          </div>

          {/* Personal Information */}
          <p className="text-zinc-400 text-2xl font-semibold my-5">
            Personal Info
          </p>
          <p className="text-zinc-400 text-xl font-semibold ">Known for</p>
          <p className="text-zinc-400 ">{info.details.known_for_department}</p>

          <p className="text-zinc-400 text-xl font-semibold mt-3">Gender</p>
          <p className="text-zinc-400 ">
            {info.details.gender === 2 ? "Male" : "Female"}
          </p>

          <p className="text-zinc-400 text-xl font-semibold mt-3">Birthday</p>
          <p className="text-zinc-400 ">{info.details.birthday}</p>

          <p className="text-zinc-400 text-xl font-semibold mt-3">Deathday</p>
          <p className="text-zinc-400 ">
            {info.details.deathday ? info.details.deathday : "Alive"}
          </p>

          <p className="text-zinc-400 text-xl font-semibold mt-3">
            Place Of Birth
          </p>
          <p className="text-zinc-400 ">{info.details.place_of_birth}</p>

          <p className="text-zinc-400 text-xl font-semibold mt-3">
            Also Known As
          </p>
          <p className="text-zinc-400 ">
            {info.details.also_known_as.join(", ")}
          </p>
        </div>

        {/* Part-3 right details and information */}
        <div className="w-[80%] mb-10">
          <p className="text-zinc-400 text-6xl font-black mb-5">
            {info.details.name}
          </p>
          <p className="text-zinc-400 text-xl font-semibold ">Biography</p>
          <p className="text-zinc-400 mt-3">{info.details.biography}</p>

          <p className="text-zinc-400 text-lg font-semibold mt-5 mb-2">
            Known For
          </p>
          <HorizontalCards data={info.combinedCredits.cast} />

          <div className="w-full flex justify-between ">
            <p className="text-zinc-400 text-xl font-semibold mt-5 mb-2">
              Acting
            </p>
            <Dropdown
              title="Category"
              options={["tv", "movie"]}
              func={(e) => setCategory(e.target.value)}
            />
          </div>

          <div className="w-full h-[50vh] mt-5 overflow-x-hidden overflow-y-auto shadow-lg shadow-[rgba(255,255,255,0.3)] border border-zinc-700 p-5 text-zinc-400 list-disc">
            {info[category + "Credits"].cast.map((c, i) => (
              <li
                key={i}
                className="hover:text-white duration-300 cursor-pointer mb-3"
              >
                <Link to={`/${category}/details/${c.id}`}>
                  <p className="inline ">
                    {c.original_name || c.original_title || c.name || c.title}
                  </p>
                  <span className="block ml-5 mt-2">
                    {c.character && `Character Name: ${c.character}`}
                  </span>
                </Link>
              </li>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default PersonDetails;
