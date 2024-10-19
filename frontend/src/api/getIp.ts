import axios from "axios";

export const getUserIp = async (): Promise<string> => {
  const response = await axios.get("https://api.ipify.org?format=json");

  return response.data.ip;
};
