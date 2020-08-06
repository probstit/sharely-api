import { ObjectID } from "mongodb";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

export interface IUser {
  _id: ObjectID;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
}

/**
 * Class representing a user object.
 */
export class User implements IUser {
  public _id: ObjectID;
  public email: string;
  public password: string;
  public firstname: string;
  public lastname: string;

  /**
   * Class constructor.
   */
  constructor(data: IUser) {
    this._id = data._id;
    this.email = data.email;
    this.password = data.password;
    this.firstname = data.firstname;
    this.lastname = data.lastname;
  }

  static create(params: Omit<IUser, "_id">) {
    return new User({
      _id: new ObjectID(),
      email: params.email.toLowerCase().trim(),
      password: bcrypt.hashSync(params.password, 12),
      firstname: User._formatName(params.firstname),
      lastname: User._formatName(params.lastname),
    });
  }

  /**
   * Check if a password matches the stored one.
   */
  doesPasswordMatch(pwd: string) {
    return bcrypt.compareSync(pwd, this.password);
  }

  /**
   * Generate a signed JWT for the user.
   */
  generateJwt(secret: string) {
    return jwt.sign({ _id: this._id.toString() }, secret, {
      expiresIn: "30d",
    });
  }

  private static _formatName(name: string) {
    return name
      .trim()
      .toLowerCase()
      .split(" ")
      .filter((part) => !!part)
      .map((part) => {
        return part[0].toUpperCase() + part.slice(1);
      })
      .join(" ");
  }
}
