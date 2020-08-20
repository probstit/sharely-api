import { Db } from "mongodb";
import { UserService } from "./service";
import { MongoRepository } from "../../util/storage/mongoRepository";
import { IMailer } from "../../util/mailer";
import { config } from "../../config";

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

  const tempTokenCollection = sharelyDb.collection("temp-tokens");
  tempTokenCollection.createIndex(
    { createdAt: 1 },
    { expireAfterSeconds: 24 * 60 * 60 } // expire docs after 24h
  );
  const tempTokenRepo = new MongoRepository(tempTokenCollection);

  const service = new UserService(
    usersRepo,
    tempTokenRepo,
    mailer,
    jwtSecret,
    config.frontEnd.hostname
  );

  return service;
}
