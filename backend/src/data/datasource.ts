import { PrismaClient } from "@prisma/client";
import { injectable } from "inversify";
import { CreateUserInput, UserRegisterModel } from "../models/UserRegister";
import { GuestData } from "../models/GuestTracking";
import { date, when } from "joi";

@injectable()
export class Datasource {
  private prisma: PrismaClient = new PrismaClient();
  private isConnected: boolean = false;

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
        await this.prisma.user.create({ data: { ...userData } });
      }
    } catch (error) {
      console.error("Failed to create user:", error);
      throw error;
    }
  };

  public getAllUsers = async () => {
    try {
      if (this.prisma) {
        return await this.prisma.user.findMany();
      }
    } catch (error) {
      console.error("Failed to create user:", error);
      throw error;
    }
  };

  public findUniqueUser = async (email: string) => {
    try {
      if (this.prisma) {
        return await this.prisma.user.findUnique({ where: { email } });
      }
    } catch (error) {
      console.error("Failed to find user:", error);
      throw error;
    }
  };

  savePasswordResetToken = async (
    userId: string,
    token: string
  ): Promise<void> => {
    await this.prisma.passwordResetToken.create({
      data: {
        userId: userId,
        token: token,
        expiresAt: new Date(Date.now() + 60 * 60 * 1000),
      },
    });
  };

  createGuest = async (guestData: GuestData) => {
    try {
      if (this.prisma) {
        await this.prisma.guest.create({ data: { ...guestData } });
      }
    } catch (error) {
      console.error("Failed to Register Guest:", error);
      throw error;
    }
  };

  getGuest = async (ipAddress: string) => {
    try {
      if (this.prisma) {
        return await this.prisma.guest.findUnique({ where: { ipAddress } });
      }
    } catch (error) {
      console.error("Failed to Get Guest Data:", error);
      throw error;
    }
  };

  updateGuest = async (guestData: GuestData) => {
    try {
      await this.prisma.guest.update({
        where: { ipAddress: guestData.ipAddress },
        data: { ...guestData },
      });
    } catch (error) {
      console.error("Failed to Update Guest:", error);
      throw error;
    }
  };
}
