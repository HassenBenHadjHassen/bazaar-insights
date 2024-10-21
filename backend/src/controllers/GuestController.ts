import { inject } from "inversify";
import { controller, httpPost } from "inversify-express-utils";
import { GuestUseCase } from "../useCases/GuestUseCase";
import { Request, Response, NextFunction } from "express";
import { GuestData } from "../models/GuestTracking";
import { STATUS_CODES } from "../utils/constants";

@controller("/guests")
export class GuestController {
  constructor(@inject(GuestUseCase) private guestUseCase: GuestUseCase) {}

  @httpPost("/")
  async getGuest(req: Request, res: Response, next: NextFunction) {
    try {
      const ipAddress = req.body.ipAddress;

      console.log(ipAddress);

      if (!ipAddress) {
        res.status(400).json({
          message: "Ip Address Incorrect",
        });
      }

      const result = await this.guestUseCase.getGuest(ipAddress);

      if (result.success) {
        res.status(result.statusCode).json({
          message: result.message,
        });
      } else {
        res
          .status(result.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR)
          .json({
            message: result.message,
          });
      }
    } catch (error) {
      next(error);
    }
  }

  @httpPost("/register")
  async registerGuest(req: Request, res: Response, next: NextFunction) {
    try {
      const guestData: GuestData = req.body;

      const result = await this.guestUseCase.createGuest(guestData);

      if (result.success) {
        res.status(result.statusCode).json({
          message: result.message,
        });
      } else {
        res
          .status(result.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR)
          .json({
            message: result.message,
          });
      }
    } catch (error) {
      next(error);
    }
  }

  @httpPost("/update")
  async updateGuest(req: Request, res: Response, next: NextFunction) {
    try {
      const guestData: GuestData = req.body;

      const result = await this.guestUseCase.updateGuest(guestData);

      if (result.success) {
        res.status(result.statusCode).json({
          message: result.message,
        });
      } else {
        res
          .status(result.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR)
          .json({
            message: result.message,
          });
      }
    } catch (error) {
      next(error);
    }
  }
}
