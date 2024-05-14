import axios from "axios";

import { API_NOTIFICATION_MESSAGE, SERVICE_URLS } from "../constants/config.js";
import { getAccessToken, getType } from "../utils/common-utils.js";
const API_URL = "http://localhost:8000";

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  function (config) {
    if (config.TYPE.params) {
      config.params = config.TYPE.params;
    } else if (config.TYPE.query) {
      config.url = config.url + "/" + config.TYPE.query;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    // stop global loader here
    return processResponse(response);
  },
  function (error) {
    //stop global loader here
    return Promise.reject(processError(error));
  }
);

////////////////////////////////////

// success -> return { isSuccess: true, data: Object}
// fail -> return { isfailuar: true, status: Srting, msg: String , code: int }

///////////////////////////////////

const processResponse = (response) => {
  if (response?.status === 200) {
    return { isSuccess: true, data: response.data };
  } else {
    return {
      isFailure: true,
      status: response?.status,
      msg: response?.msg,
      code: response?.code,
    };
  }
};

////////////////////////////////////

// success -> return { isSuccess: true, data: Object}
// fail -> return { isfailuar: true, status: Srting, msg: String , code: int }

///////////////////////////////////
const processError = (error) => {
  if (error.response) {
    // Request made and server responded with a status other
    // that falls out of the range 2.x.x
    console.log("ERROR IN RESPONSE:", error.toJSON());
    return {
      isError: true,
      msg: API_NOTIFICATION_MESSAGE.responseFailure,
      code: error.response.status,
    };
  } else if (error.request) {
    // request made but no respone was recieved
    console.log("ERROR IN REQUEST:", error.toJSON());
    return {
      isError: true,
      msg: API_NOTIFICATION_MESSAGE.requestFailure,
      code: "",
    };
  } else {
    // something happened in setting up request that tringger an error
    console.log("ERROR IN NETWORK:", error.toJSON());
    return {
      isError: true,
      msg: API_NOTIFICATION_MESSAGE.networkError,
      code: "",
    };
  }
};

const API = {};

// for (const [key, value] of Object.entries(SERVICE_URLS)) {
//   API[key] = (body, showUploadProgress, showDownLoadProgress) =>
//     axiosInstance({
//       method: value.method,
//       url: value.url,
//       data: body,
//       responseType: value.responseType,
//       onUploadProgress: function (progressEvent) {
//         if (showUploadProgress) {
//           let percentageCompleted = Math.round(
//             (progressEvent.loaded * 100) / progressEvent.total
//           );
//           showUploadProgress(percentageCompleted);
//         }
//       },
//       onDownloadProgress: function (progressEvent) {
//         if (showDownLoadProgress) {
//           let percentageCompleted = Math.round(
//             (progressEvent.loaded * 100) / progressEvent.total
//           );
//           showDownLoadProgress(percentageCompleted);
//         }
//       },
//     });
// }

for (const [key, value] of Object.entries(SERVICE_URLS)) {
  API[key] = (body, showUploadProgress, showDownloadProgress) =>
    axiosInstance({
      method: value.method,
      url: value.url,
      data: value.method === "DELETE" ? null : body,
      responseType: value.responseType,
      headers: {
        authorization: getAccessToken(),
      },
      TYPE: getType(value, body),
      onUploadProgress: function (progressEvent) {
        if (showUploadProgress) {
          let percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          showUploadProgress(percentCompleted);
        }
      },
      onDownloadProgress: function (progressEvent) {
        if (showDownloadProgress) {
          let percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          showDownloadProgress(percentCompleted);
        }
      },
    });
}
export { API };
