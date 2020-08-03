import { MongoClient } from "mongodb";
import { setLocale } from "exceptional.js";
// import EPollErrors from 'epoll-errors';

// plumbing
import { Logger } from "./util/process/logger";
// import {MongoRepository} from './util/storage/mongoRepository';
// import * as MongoHelper from './util/helpers/mongo';
// import { IFileStore } from "./util/storage/IFileStore";
// import { DiskStore } from "./util/storage/diskStore";
// import { S3Store } from "./util/storage/s3Store";

// services
// import {RateLimiter} from './application/rateLimiter';
import { get as UserServiceFactory } from "./domain/users";
// import {get as StorageServiceFactory} from './domain/storage';

// gateway
import { get as ApiGatewayFactory, ApiGateway } from "./gateway";
import { config } from "./config";
import { UserService } from "./domain/users/service";

/**
 * Class representing the application object.
 *
 * @author Dragos Sebestin
 */
export class Sharely {
  private _mongoClient: MongoClient | undefined;

  public userService: UserService | undefined;
  // public shareService:;

  public apiGateway: ApiGateway | undefined;

  /**
   * Class constructor.
   */
  constructor() {
    // initialize error subsystem
    // EPollErrors();
    setLocale("ro");
  }

  /**
   * Start the application.
   */
  async start() {
    // start mongo connection
    this._mongoClient = await MongoClient.connect(config.mongo.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // init services
    this.userService = await this._initUsers(this._mongoClient);

    // init api gateway
    await this._initGateway(this.userService);

    Logger.get().write("*** Sharely started ***");
  }

  /**
   * Stop the application.
   */
  async stop() {
    // close MongoDB connection
    if (this._mongoClient) await this._mongoClient.close();

    Logger.get().write("*** Sharely closed ***");
  }

  /**
   * Initialize the user service.
   */
  private async _initUsers(mongoClient: MongoClient) {
    const db = mongoClient.db(config.mongo.usersDb);
    return UserServiceFactory(db);
  }

  /**
   * Initialize API gateway.
   */
  private async _initGateway(users: UserService) {
    this.apiGateway = ApiGatewayFactory(config.engine.version, users);
  }
}
