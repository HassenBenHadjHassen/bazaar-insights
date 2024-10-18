import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { controller, httpGet } from "inversify-express-utils";
import { inject } from "inversify";
import { UserUseCase } from "../useCases/UserUseCase";

@controller("/users")
export class UserController {
  constructor(@inject(UserUseCase) private userUseCase: UserUseCase) {}

  @httpGet("/")
  async getUsers(_: Request, res: Response) {
    const users = this.userUseCase.getUsers();

    return res.json(users);
  }
}

// export const register = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { name, email, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await prisma.user.create({
//       data: {
//         name,
//         email,
//         password: hashedPassword,
//       },
//     });
//     res
//       .status(201)
//       .json({ message: "User created successfully", userId: user.id });
//   } catch (error) {
//     next(error);
//   }
// };

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
