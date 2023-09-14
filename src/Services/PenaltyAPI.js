import axios from "axios";

import envVariables from "../utils/config.json";

export const getPenaltyService = ({ driverId }) => {
  return axios({
    method: "GET",
    url: `${envVariables.REACT_APP_API_BASE_URL}/panelty/${driverId}`,
    headers: {
      "x-auth-token": sessionStorage.getItem("token"),
    },
  });
};

export const updatePenaltyService = ({ driverId }) => {
  return axios({
    method: "PUT",
    url: `${envVariables.REACT_APP_API_BASE_URL}/panelty/${driverId}`,
    headers: {
      "x-auth-token": sessionStorage.getItem("token"),
    },
  });
};
