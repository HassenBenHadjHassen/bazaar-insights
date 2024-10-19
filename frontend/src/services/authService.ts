import axios from "axios";
import { loginApi, registerApi } from "../api/auth";
import { getUserIp } from "../api/getIp";
import { AuthServiceResponse, UserRegisterModel } from "../types/authTypes";

export const register = async (
  fullName: string,
  email: string,
  password: string
): Promise<AuthServiceResponse> => {
  try {
    const ipAddress = await getUserIp();

    const userData: UserRegisterModel = {
      fullName,
      email,
      password,
      ipAddress,
    };

    const response = await registerApi(userData);
    const data: string = response.data;

    if (response.status === 200) {
      return {
        success: true,
        data,
      };
    } else {
      return {
        success: false,
        data,
      };
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle Axios error
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data ||
        "An error occurred";
      return {
        success: false,
        data: errorMessage,
      };
    } else {
      // Handle unexpected errors
      return {
        success: false,
        data: "An unexpected error occurred",
      };
    }
  }
};

export const login = async (
  email: string,
  password: string
): Promise<AuthServiceResponse> => {
  try {
    const response = await loginApi(email, password);

    if (response.status === 200) {
      const data: string = response.data.message; // Assuming this is where the JWT is returned
      localStorage.setItem("jwtToken", data);
      return {
        success: true,
        data,
      };
    } else {
      return {
        success: false,
        data: "Unexpected response status",
      };
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle Axios error
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data ||
        "An error occurred";
      return {
        success: false,
        data: errorMessage,
      };
    } else {
      // Handle unexpected errors
      return {
        success: false,
        data: "An unexpected error occurred",
      };
    }
  }
};

export const getTokenFromLocalStorage = () => {
  const token = localStorage.getItem("jwtToken");
  return token;
};

export const logout = () => {
  localStorage.removeItem("jwtToken");
};
