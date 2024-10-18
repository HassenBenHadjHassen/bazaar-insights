import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { controller, httpGet, httpPost } from "inversify-express-utils";
import { inject } from "inversify";
import { UserUseCase } from "../useCases/UserUseCase";
import { UserRegisterModel } from "../models/UserRegister";

@controller("/users")
export class UserController {
  constructor(@inject(UserUseCase) private userUseCase: UserUseCase) {}

  @httpPost("/register")
  async registerUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userData: UserRegisterModel = req.body;

      const result = await this.userUseCase.registerUser(userData);

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

  @httpGet("/")
  async getUsers(_: Request, res: Response) {
    const users = this.userUseCase.getUsers();

    return res.json(users);
  }
}

// export const login = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { email, password } = req.body;
//     const user = await prisma.user.findUnique({ where: { email } });
//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }
//     const token = jwt.sign(
//       { userId: user.id },
//       process.env.JWT_SECRET as string,
//       { expiresIn: "1h" }
//     );
//     res.json({ token });
//   } catch (error) {
//     next(error);
//   }
// };
