import axios from "axios";

const instance = axios.create({
  baseURL: "https://bazaar-api.hassenbenhadjhassen.com",
});

export default instance;
