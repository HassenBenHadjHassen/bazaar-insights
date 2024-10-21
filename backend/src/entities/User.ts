import { User as UserModel } from "@prisma/client";

export class User {
  private userData: UserModel;

  constructor(userData: UserModel) {
    this.userData = userData;
  }

  public get id() {
    return this.userData.id;
  }

  public get email() {
    return this.userData.email;
  }

  public get role() {
    return this.userData.role;
  }

  public get ipAddress() {
    return this.userData.ipAddress;
  }

  public get filterAttemptsToday() {
    return this.userData.filterAttemptsToday;
  }

  public get lastActivity() {
    return this.userData.lastActivity;
  }
}
