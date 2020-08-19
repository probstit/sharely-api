import { Db } from "mongodb";
import { UserService } from "./service";
import { MongoRepository } from "../../util/storage/mongoRepository";
import { IMailer } from "../../util/mailer";

/**
 * Factory method for instantiating a user service class.
 */
export function get(
  sharelyDb: Db,
  jwtSecret: string,
  mailer: IMailer
): UserService {
  const usersCollection = sharelyDb.collection("users");
  usersCollection.createIndex({ email: 1 }, { unique: true });
  const usersRepo = new MongoRepository(usersCollection);

  const service = new UserService(usersRepo, jwtSecret, mailer);

  return service;
}
