import { UserRegisterModel } from "../types/authTypes";
import axios from "../utils/axios";

export const registerApi = async (userData: UserRegisterModel) => {
  return await axios.post("/users/register", JSON.stringify(userData), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const loginApi = async (email: string, password: string) => {
  return await axios.post("/users/login", JSON.stringify({ email, password }), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
