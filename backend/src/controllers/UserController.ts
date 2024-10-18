import { Request, Response, NextFunction } from "express";
import { controller, httpGet, httpPost } from "inversify-express-utils";
import { inject } from "inversify";
import { UserUseCase } from "../useCases/UserUseCase";
import { UserRegisterModel } from "../models/UserRegister";
import { UserLoginModel } from "../models/UserLogin";
import { loginRateLimiter } from "../middlewares/RateLimiter";

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
        res.status(result.statusCode || 500).json({
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
        res.status(result.statusCode || 500).json({
          message: result.message,
        });
      }
    } catch (error) {
      next(error);
    }
  }
}
