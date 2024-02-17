import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://api.themoviedb.org/",
  params: {
    api_key: "df506350a7840ac977e8c39b133d6d84",
  },
});
