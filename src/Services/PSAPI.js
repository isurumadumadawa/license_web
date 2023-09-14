import axios from "axios";

import envVariables from "../utils/config.json";

export const getPSService = () => {
  return axios({
    method: "GET",
    url: `${envVariables.REACT_APP_API_BASE_URL}/police-station`,
    headers: {
      "x-auth-token": sessionStorage.getItem("token"),
    },
  });
};
