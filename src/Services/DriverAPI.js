import axios from "axios";
import envVariables from "../utils/config.json";

export const uploadProfileImage = async (uploadFile) => {
  const formData = new FormData();
  formData.append("file", uploadFile);
  formData.append("upload_preset", "job-seeker");

  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
    onUploadProgress: (progressEvent) => {
      const progress = Math.round(
        (progressEvent.loaded / progressEvent.total) * 100
      );
      console.log("progress....", progress);
    },
  };
  try {
    const result = await axios.post(
      `${envVariables.REACT_APP_IMAGE_URL}`,
      formData,
      config
    );

    const url = result?.data?.secure_url
      ? result?.data?.secure_url
      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVA_HrQLjkHiJ2Ag5RGuwbFeDKRLfldnDasw&usqp=CAU";

    return url;
  } catch (error) {
    console.log("error....", error);
    return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVA_HrQLjkHiJ2Ag5RGuwbFeDKRLfldnDasw&usqp=CAU";
  }
};

export const createDriverService = ({
  userName,
  password,
  name,
  otherName,
  dob,
  mobileNumber,
  gender,
  bloodType,
  address,
  image,
  issuedDate,
  expireDate,
  vehicles,
}) => {
  return axios({
    method: "POST",
    url: `${envVariables.REACT_APP_API_BASE_URL}/driver`,
    headers: {
      "x-auth-token": sessionStorage.getItem("token"),
    },
    data: {
      userName,
      password,
      name,
      otherName,
      dob,
      mobileNumber,
      gender,
      bloodType,
      address,
      image,
      issuedDate,
      expireDate,
      vehicles,
    },
  });
};

export const getDriversService = () => {
  return axios({
    method: "GET",
    url: `${envVariables.REACT_APP_API_BASE_URL}/driver`,
    headers: {
      "x-auth-token": sessionStorage.getItem("token"),
    },
  });
};

export const getDriverService = ({ uuid }) => {
  console.log("uuid", uuid);
  return axios({
    method: "GET",
    url: `${envVariables.REACT_APP_API_BASE_URL}/driver/${uuid}`,
    headers: {
      "x-auth-token": sessionStorage.getItem("token"),
    },
  });
};

export const getDriverByMobileService = ({ mobileNumber }) => {
  return axios({
    method: "GET",
    url: `${envVariables.REACT_APP_API_BASE_URL}/driver/mobile/${mobileNumber}`,
    headers: {
      "x-auth-token": sessionStorage.getItem("token"),
    },
  });
};
