export interface JwtPayload {
  userId: string;
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
