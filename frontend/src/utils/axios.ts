import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API,
});

export default instance;
