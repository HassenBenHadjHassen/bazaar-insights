import { GuestData } from "../types/authTypes";
import axios from "../utils/axios";

export const registerApi = async (guestData: GuestData) => {
  return await axios.post("/guests/register", guestData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getGuestApi = async (ipAddress: string) => {
  return await axios.post(
    "/guests/",
    { ipAddress },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const updateGuestApi = async (guestData: GuestData) => {
  return await axios.post("/guests/update", guestData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
