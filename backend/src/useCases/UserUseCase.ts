import { inject, injectable } from "inversify";
import bcrypt from "bcryptjs";
import {
  createUserWithDefaults,
  UserRegisterModel,
} from "../models/UserRegister";
import { Datasource } from "../data/datasource";
import { UseCaseReturn } from "../types/useCaseReturn";
import { UserLoginModel } from "../models/UserLogin";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { MESSAGES, STATUS_CODES } from "../utils/constants";
import {
  userLoginSchema,
  userRegisterSchema,
} from "../utils/validationSchemas";

dotenv.config();

@injectable()
export class UserUseCase {
  constructor(@inject(Datasource) private datasource: Datasource) {}

  private generateToken(userId: string): string {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.warn("JWT_SECRET is not defined in environment variables");
      process.exit(1);
    }
    return jwt.sign({ userId }, jwtSecret, { expiresIn: "6h" });
  }

  private createResponse(
    success: boolean,
    statusCode: number,
    message: string
  ): UseCaseReturn {
    return {
      success: success,
      statusCode,
      message,
    };
  }

  createUser = async (userData: UserRegisterModel): Promise<UseCaseReturn> => {
    const { error } = userRegisterSchema.validate(userData);
    if (error) {
      return this.createResponse(
        false,
        STATUS_CODES.BAD_REQUEST,
        error.details[0].message
      );
    }

    try {
      const existingUser = await this.datasource.findUniqueUser({
        where: { email: userData.email },
      });

      if (existingUser) {
        return this.createResponse(
          false,
          STATUS_CODES.BAD_REQUEST,
          MESSAGES.EMAIL_IN_USE
        );
      }

      const hashedPassword = await bcrypt.hash(userData.password, 10);

      const newUser = createUserWithDefaults({
        ...userData,
        password: hashedPassword,
      });

      await this.datasource.createUser(newUser);

      return this.createResponse(
        true,
        STATUS_CODES.CREATED,
        MESSAGES.USER_REGISTERED
      );
    } catch (error) {
      console.error("Error registering user:", error);

      return this.createResponse(
        false,
        STATUS_CODES.INTERNAL_SERVER_ERROR,
        MESSAGES.INTERNAL_ERROR
      );
    }
  };

  authenticateUser = async (
    userData: UserLoginModel
  ): Promise<UseCaseReturn> => {
    const { error } = userLoginSchema.validate(userData);
    if (error) {
      return this.createResponse(
        false,
        STATUS_CODES.BAD_REQUEST,
        error.details[0].message
      );
    }

    try {
      const user = await this.datasource.findUniqueUser({
        where: { email: userData.email },
      });

      if (!user) {
        return this.createResponse(
          false,
          STATUS_CODES.UNAUTHORIZED,
          MESSAGES.INVALID_CREDENTIALS
        );
      }

      const isPasswordValid = await bcrypt.compare(
        userData.password,
        user.password
      );

      if (!isPasswordValid) {
        return this.createResponse(
          false,
          STATUS_CODES.UNAUTHORIZED,
          MESSAGES.INVALID_CREDENTIALS
        );
      }

      const token = this.generateToken(user.id);

      return this.createResponse(true, STATUS_CODES.SUCCESS, token);
    } catch (error) {
      console.error("Error logging in user:", error);
      return this.createResponse(
        false,
        STATUS_CODES.INTERNAL_SERVER_ERROR,
        MESSAGES.INTERNAL_ERROR
      );
    }
  };
}
