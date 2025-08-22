import axios from "../../utils/axios";
import { loadPerson } from "../reducers/personSlice";
export { removePerson } from "../reducers/personSlice";

export const asyncLoadPerson = (id) => async (dispatch, getState) => {
  try {
    const details = await axios.get(`/person/${id}`);
    const externalId = await axios.get(`/person/${id}/external_ids`);
    const combinedCredits = await axios.get(`/person/${id}/combined_credits`);
    const tvCredits = await axios.get(`/person/${id}/tv_credits`);
    const movieCredits  = await axios.get(`/person/${id}/movie_credits`);

    let theUltimateDetails = {
      details: details.data,
      externalId: externalId.data,
      combinedCredits:combinedCredits.data,
      movieCredits:movieCredits.data,
      tvCredits:tvCredits.data,
    };

    // console.log(theUltimateDetails)

    dispatch(loadPerson(theUltimateDetails));
  } catch (err) {
    console.log("Error:", err);
  }
};
