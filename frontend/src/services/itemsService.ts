import axios from "axios";
import { getGuestItems } from "../api/items";
import { FilterParams } from "../utils/types";

export const guestItems = async (filters: FilterParams) => {
  try {
    const response = await getGuestItems(filters);

    if (response.status === 200) {
      const data: string = response.data.message;
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
