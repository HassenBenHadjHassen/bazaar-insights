import { UseCaseReturn } from "../types/useCaseReturn";

export const createResponse = (
  success: boolean,
  statusCode: number,
  message: string
): UseCaseReturn => {
  return {
    success: success,
    statusCode,
    message,
  };
};
