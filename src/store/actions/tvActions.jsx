import axios from "../../utils/axios";
import { loadTv } from "../reducers/tvSlice";
export { removeTv } from "../reducers/tvSlice";

export const asyncLoadTv = (id) => async (dispatch, getState) => {
  try {
    const details = await axios.get(`/tv/${id}`);
    const externalId = await axios.get(`/tv/${id}/external_ids`);
    const recommendations = await axios.get(`/tv/${id}/recommendations`);
    const similar = await axios.get(`/tv/${id}/similar`);
    const videos = await axios.get(`/tv/${id}/videos`);
    const translations = await axios.get(`/tv/${id}/translations`);
    const watchProviders = await axios.get(`/tv/${id}/watch/providers`);

    let theUltimateDetails = {
      details: details.data,
      externalId: externalId.data,
      recommendations: recommendations.data.results,
      similar: similar.data.results,
      translations: translations.data.translations.map((t) => t.english_name),
      videos: videos.data.results.find((m) => m.type === "Trailer"),
      watchProviders: watchProviders.data.results.IN,
    };

    // console.log(theUltimateDetails)

    dispatch(loadTv(theUltimateDetails));
  } catch (err) {
    console.log("Error:", err);
  }
};
