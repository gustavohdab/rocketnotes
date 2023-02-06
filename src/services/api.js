import axios from "axios";

export const api = axios.create({
  baseURL: "https://api-rocketnotes-1la2.onrender.com",
});
