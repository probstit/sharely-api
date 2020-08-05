import { Db } from "mongodb";
import { UserService } from "./service";
import { MongoRepository } from "../../util/storage/mongoRepository";

export function get(sharelyDb: Db): UserService {
  const usersCollection = sharelyDb.collection("users");
  usersCollection.createIndex({ email: 1 }, { unique: true });
  const usersRepo = new MongoRepository(usersCollection);

  const service = new UserService(usersRepo);

  return service;
}
