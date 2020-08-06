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
  constructor(
    private _userRepo: MongoRepository<IUser>,
    private _jwtSecret: string
  ) {}

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

  /**
   * Login a user account.
   */
  async login(params: { email: string; password: string }) {
    const found = await this._userRepo.find({
      email: params.email.trim().toLowerCase(),
    });
    if (found.length === 0) {
      throw new Error("no account with this email found");
    }

    const user = new User(found[0]);
    if (!user.doesPasswordMatch(params.password)) {
      throw new Error("wrong password");
    }

    return this.authenticate(user);
  }

  authenticate(user: User) {
    return {
      jwt: user.generateJwt(this._jwtSecret),
      user: {
        _id: user._id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
      },
    };
  }
}
