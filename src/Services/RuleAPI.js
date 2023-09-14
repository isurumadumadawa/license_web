import axios from "axios";

import envVariables from "../utils/config.json";

export const getRulesService = () => {
  return axios({
    method: "GET",
    url: `${envVariables.REACT_APP_API_BASE_URL}/rule`,
    headers: {
      "x-auth-token": sessionStorage.getItem("token"),
    },
  });
};
