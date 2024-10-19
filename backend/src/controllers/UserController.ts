import { Request, Response, NextFunction } from "express";
import { controller, httpGet, httpPost } from "inversify-express-utils";
import { inject } from "inversify";
import { UserUseCase } from "../useCases/UserUseCase";
import { UserRegisterModel } from "../models/UserRegister";
import { UserLoginModel } from "../models/UserLogin";
import { loginRateLimiter } from "../middlewares/RateLimiter";
import { STATUS_CODES } from "../utils/constants";

@controller("/users")
export class UserController {
  constructor(@inject(UserUseCase) private userUseCase: UserUseCase) {}

  @httpPost("/register")
  async registerUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userData: UserRegisterModel = req.body;

      const result = await this.userUseCase.createUser(userData);

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

  @httpPost("/login", loginRateLimiter)
  async loginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userData: UserLoginModel = req.body;

      const result = await this.userUseCase.authenticateUser(userData);

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

  @httpPost("/reset-password")
  async recoverUserPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;

      const result = await this.userUseCase.recoverPassword(email);

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

  @httpGet("/")
  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.userUseCase.getAllUsers();

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
