import { Db } from "mongodb";
import { UserService } from "./service";

export function get(usersDb: Db): UserService {
  const service = new UserService();

  return service;
}
