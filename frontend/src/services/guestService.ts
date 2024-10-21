import axios from "axios";
import { getUserIp } from "../api/getIp";
import { getGuestApi, registerApi, updateGuestApi } from "../api/guest";
import { GuestData } from "../types/authTypes";

export const registerGuest = async (
  timeRemaining: number,
  filterAttemptsRemaining: number
) => {
  try {
    const ipAddress = await getUserIp();

    const guestData: GuestData = {
      ipAddress,
      timeRemaining,
      filterAttemptsRemaining,
    };

    const response = await registerApi(guestData);

    const data: string = response.data.message;

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

export const updateGuest = async (
  timeRemaining: number,
  filterAttemptsRemaining: number
) => {
  try {
    const ipAddress = await getUserIp();

    const guestData: GuestData = {
      ipAddress,
      timeRemaining,
      filterAttemptsRemaining,
    };

    const response = await updateGuestApi(guestData);

    const data: string = response.data.message;

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

export const getGuest = async () => {
  try {
    const ipAddress = await getUserIp();

    const response = await getGuestApi(ipAddress);

    const data: string = response.data.message;

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
