import { Role } from "@prisma/client";

export const createUserWithDefaults = (
  userRegisterModel: UserRegisterModel
) => {
  return {
    fullName: userRegisterModel.fullName,
    email: userRegisterModel.email,
    password: userRegisterModel.password,
    role: Role.ACCOUNT, // Default role
    dailyUsageTime: 0, // Default usage time
    dailyFilterAttempts: 0, // Default filter attempts
    lastLogin: new Date(), // Set last login to now
    createdAt: new Date(), // Set created time
    updatedAt: new Date(), // Set updated time
    ipAddress: userRegisterModel.ipAddress, // Optional IP address
    filterAttemptsToday: 0, // Default filter attempts today
    lastActivity: null, // No activity on registration
  };
};

export interface UserRegisterModel {
  fullName: string;
  email: string;
  password: string;
  ipAddress: string;
}

export interface CreateUserInput {
  fullName: string;
  email: string;
  password: string;
  role: Role;
  dailyUsageTime: number;
  dailyFilterAttempts: number;
  lastLogin: Date;
  createdAt: Date;
  updatedAt: Date;
  ipAddress: string;
  filterAttemptsToday: number;
  lastActivity: Date | null;
}
