import { PrismaClient } from "@prisma/client";
import { injectable } from "inversify";
import { CreateUserInput, UserRegisterModel } from "../models/UserRegister";

@injectable()
export class Datasource {
  private prisma: PrismaClient = new PrismaClient();
  private isConnected: boolean = false;

  // private getPrismaClient() {
  //   if (!this.prisma) {
  //     this.prisma = new PrismaClient();
  //   }
  //   return this.prisma;
  // }

  public connect = async (): Promise<void> => {
    if (this.isConnected) return;

    try {
      await this.prisma.$connect();
      this.isConnected = true;
      console.log("Connected to the database.");
    } catch (error) {
      console.error("Failed to connect to the database:", error);
      throw error;
    }
  };

  public disconnect = async (reason: string): Promise<void> => {
    if (!this.isConnected) return;

    try {
      if (this.prisma) {
        await this.prisma.$disconnect();
        this.isConnected = false;
        console.log("Gracefully disconnected from the database: " + reason);
      }
    } catch (error) {
      console.error("Failed to disconnect from the database:", error);
      throw error;
    }
  };

  public createUser = async (userData: CreateUserInput) => {
    try {
      if (this.prisma) {
        const user = await this.prisma.user.create({ data: { ...userData } });
        console.log(user);
      } else {
        console.log("Prisma not found");
      }
    } catch (error) {
      console.error("Failed to create user:", error);
      throw error;
    }
  };

  public findUniqueUser = async (data: any) => {
    try {
      if (this.prisma) {
        return await this.prisma.user.findUnique(data);
      }
    } catch (error) {
      console.error("Failed to find user:", error);
      throw error;
    }
  };
}
