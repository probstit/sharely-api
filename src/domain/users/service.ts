// import { ObjectID, Collection } from "mongodb";
// import { context } from "exceptional.js";
// import {USER_NAMESPACE} from 'epoll-errors';

import { MongoRepository } from "../../util/storage/mongoRepository";
import { IUser, User } from "./kernel/user";

// types

// const EXCEPTIONAL = context(USER_NAMESPACE);

/**
 * User service class.
 *
 * @author Dragos Sebestin
 */
export class UserService {
  /**
   * Class constructor.
   */
  constructor(private _userRepo: MongoRepository<IUser>) {}

  /**
   * Register a new user account.
   */
  async register(params: Omit<IUser, "_id">) {
    const user = User.create(params);

    // check if email is already registered
    const found = await this._userRepo.find({ email: user.email });
    if (found.length === 1) {
      throw new Error("email is already used");
    }

    await this._userRepo.add(user);
  }
}
