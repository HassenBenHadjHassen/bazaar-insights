import { inject, injectable } from "inversify";
import bcrypt from "bcryptjs";
import {
  createUserWithDefaults,
  UserRegisterModel,
} from "../models/UserRegister";
import { Datasource } from "../data/datasource";
import { UseCaseReturn } from "../types/useCaseReturn";

@injectable()
export class UserUseCase {
  constructor(@inject(Datasource) private datasource: Datasource) {}

  registerUser = async (
    userData: UserRegisterModel
  ): Promise<UseCaseReturn> => {
    try {
      const existingUser = await this.datasource.findUniqueUser({
        where: { email: userData.email },
      });

      if (existingUser) {
        return {
          success: false,
          statusCode: 400,
          message: "Email already in use",
        };
      }

      const hashedPassword = await bcrypt.hash(userData.password, 10);

      const newUser = createUserWithDefaults({
        ...userData,
        password: hashedPassword,
      });

      await this.datasource.createUser(newUser);

      return {
        success: true,
        statusCode: 201,
        message: "User registered successfully",
      };
    } catch (error) {
      console.error("Error registering user:", error);
      return {
        success: false,
        statusCode: 500,
        message: "Internal server error",
      };
    }
  };

  getUsers() {
    return [
      { id: 1, name: "John Doe", email: "john@example.com" },
      { id: 2, name: "Jane Smith", email: "jane@example.com" },
    ];
  }
}
