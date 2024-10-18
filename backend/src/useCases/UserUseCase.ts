import { injectable } from "inversify";
import { User } from "../entities/User";

@injectable()
export class UserUseCase {
  getUsers() {
    // Simulated data for demonstration purposes
    return [
      { id: 1, name: "John Doe", email: "john@example.com" },
      { id: 2, name: "Jane Smith", email: "jane@example.com" },
    ];
  }
}
