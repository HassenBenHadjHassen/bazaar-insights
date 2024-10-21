export interface JwtPayload {
  userId: string;
  role: Role;
  fullName: string;
  email: string;
  iat: number;
  exp: number;
}

export interface AuthServiceResponse {
  success: boolean;
  data: string;
}

export interface AuthContextType {
  user: JwtPayload | null;
  register: (
    fullName: string,
    email: string,
    password: string
  ) => Promise<AuthServiceResponse | undefined>;
  login: (
    email: string,
    password: string
  ) => Promise<AuthServiceResponse | undefined>;
  logout: () => void;
  isAuthenticated: boolean;
}

export interface UserRegisterModel {
  fullName: string;
  email: string;
  password: string;
  ipAddress: string;
}

export interface GuestData {
  ipAddress: string;
  timeRemaining: number;
  filterAttemptsRemaining: number;
}

export enum Role {
  ACCOUNT = "ACCOUNT",
  PRO = "PRO",
}

export interface GuestInfo {
  ipAddress: string;
  timeRemaining: number;
  filterAttemptsRemaining: number;
  id: string;
}
