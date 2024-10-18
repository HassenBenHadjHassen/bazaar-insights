import { PrismaClient } from "@prisma/client";
import { injectable } from "inversify";

@injectable()
export class Datasource {
  private prisma: PrismaClient | null = null;

  private getPrismaClient() {
    if (!this.prisma) {
      this.prisma = new PrismaClient();
    }
    return this.prisma;
  }

  public connect = async (): Promise<void> => {
    try {
      await this.getPrismaClient().$connect();
      console.log("Connected to the database.");
    } catch (error) {
      console.error("Failed to connect to the database:", error);
      throw error;
    }
  };

  public disconnect = async (): Promise<void> => {
    try {
      if (this.prisma) {
        await this.prisma.$disconnect();
        console.log("Disconnected from the database.");
      }
    } catch (error) {
      console.error("Failed to disconnect from the database:", error);
      throw error;
    }
  };
}
