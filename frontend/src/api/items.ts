import axios from "../utils/axios";
import { FilterParams } from "../utils/types";

export const getGuestItems = async (filters: FilterParams) => {
  const body = {
    filters,
  };

  return await axios.post("/items?limit=3", JSON.stringify(body), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
