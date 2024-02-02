import { toast } from "sonner";
import axios, { HeadersDefaults } from "axios";

const axiosClient = axios.create();

// Replace this with our own backend base URL
axiosClient.defaults.baseURL = "https://vsdc.azurewebsites.net";

type headers = {
  "Content-Type": string;
  Accept: string;
  Authorization: string;
};

axiosClient.defaults.headers.common["Content-Type"] = "application/json";
axiosClient.defaults.headers.common.Accept = "application/json";

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access-token");

    if (token) {
      // Configure this as per your backend requirements
      config.headers!["Authorization"] = `Bearer ${JSON.parse(token)}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    //
    console.log(err, "axios error");

    if (originalConfig.url !== "api/user/login" && err.response) {
      // Access Token was expired
      if (err.response.status === 401) {
        // originalConfig._retry = true;

        // try {
        //   const refreshToken = localStorage.getItem("refresh-token");
        //   const rs = await axios.get(
        //     `https://vsdc.azurewebsites.net/api/token?${refreshToken}`,
        //     {
        //       headers: {
        //         Authorization: `Bearer ${localStorage.getItem(
        //           "refresh-token"
        //         )!}`,
        //       },
        //     }
        //   );
        //   console.log(rs, "axios interceptor response");
        //   const data = rs.data;
        //   console.log(data, "axios interceptor data");

        //   const access = rs.data.data.data.tokenSet.jwtToken;
        //   const refresh = rs.data.data.data.tokenSet.refreshToken;

        //   localStorage.setItem("access-token", access);
        //   localStorage.setItem("refresh-token", refresh);

        //   return axiosClient(originalConfig);
        // } catch (_error) {
        console.log("please log in");

        // toast({ description: "Session time out. Please login again." });
        // Logging out the user by removing all the tokens from local
        localStorage.removeItem("access-token");
        localStorage.removeItem("refresh-token");

        // Redirecting the user to the landing page
        window.location.href = "/login";
        return Promise.reject("Access token expired");
        // }
      }
    }

    return Promise.reject(err);
  }
);

export default axiosClient;
