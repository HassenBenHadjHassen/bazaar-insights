import { inject, injectable } from "inversify";
import { Datasource } from "../data/datasource";
import { GuestData } from "../models/GuestTracking";
import { getGuestSchema, guestDataSchema } from "../utils/validationSchemas";
import { createResponse } from "../utils/createResponse";
import { MESSAGES, STATUS_CODES } from "../utils/constants";

@injectable()
export class GuestUseCase {
  constructor(@inject(Datasource) private datasource: Datasource) {}

  createGuest = async (guestData: GuestData) => {
    // Validate guest data using schema
    const { error } = guestDataSchema.validate(guestData);

    if (error) {
      return createResponse(
        false,
        STATUS_CODES.BAD_REQUEST,
        error.details[0].message
      );
    }

    try {
      // Check if a guest with the same IP address already exists
      const existingGuest = await this.datasource.getGuest(guestData.ipAddress);

      if (existingGuest) {
        // Return a response if guest with the same IP address already exists
        return createResponse(
          false,
          STATUS_CODES.BAD_REQUEST,
          MESSAGES.GUEST_EXISTS
        );
      }

      // If no existing guest, create a new one
      await this.datasource.createGuest(guestData);

      return createResponse(
        true,
        STATUS_CODES.CREATED,
        MESSAGES.GUEST_REGISTERED
      );
    } catch (error: any) {
      // Handle unique constraint violation error (P2002)
      if (
        error.code === "P2002" &&
        error.meta?.target === "Guest_ipAddress_key"
      ) {
        return createResponse(
          false,
          STATUS_CODES.BAD_REQUEST,
          MESSAGES.GUEST_EXISTS
        );
      }

      // Log any other errors and return an internal server error response
      console.error("Error creating guest:", error);

      return createResponse(
        false,
        STATUS_CODES.INTERNAL_SERVER_ERROR,
        MESSAGES.INTERNAL_ERROR
      );
    }
  };

  getGuest = async (ipAddress: string) => {
    const { error } = getGuestSchema.validate(ipAddress);

    if (error) {
      return createResponse(
        false,
        STATUS_CODES.BAD_REQUEST,
        error.details[0].message
      );
    }

    try {
      const guest = await this.datasource.getGuest(ipAddress);

      if (guest) {
        return createResponse(
          true,
          STATUS_CODES.CREATED,
          JSON.stringify(guest)
        );
      } else {
        return createResponse(
          false,
          STATUS_CODES.NOT_FOUND,
          MESSAGES.INVALID_GUEST
        );
      }
    } catch (error) {
      console.error("Error getting guest:", error);

      return createResponse(
        false,
        STATUS_CODES.INTERNAL_SERVER_ERROR,
        MESSAGES.INTERNAL_ERROR
      );
    }
  };

  updateGuest = async (guestData: GuestData) => {
    const { error } = guestDataSchema.validate(guestData);

    if (error) {
      return createResponse(
        false,
        STATUS_CODES.BAD_REQUEST,
        error.details[0].message
      );
    }

    try {
      await this.datasource.updateGuest(guestData);

      return createResponse(
        true,
        STATUS_CODES.CREATED,
        MESSAGES.GUEST_REGISTERED
      );
    } catch (error) {
      console.error("Error updating guest:", error);

      return createResponse(
        false,
        STATUS_CODES.INTERNAL_SERVER_ERROR,
        MESSAGES.INTERNAL_ERROR
      );
    }
  };
}
