import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.hypixel.net",
});

export default instance;
