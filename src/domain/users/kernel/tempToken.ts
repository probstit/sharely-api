import { ObjectID } from "mongodb";

export interface ITempToken {
  _id: ObjectID;
  userId: ObjectID;
  createdAt: Date;
}

export class TempToken implements ITempToken {
  public _id: ObjectID;
  public userId: ObjectID;
  public createdAt: Date;

  /**
   * Class constructor.
   */
  constructor(data: ITempToken) {
    this._id = data._id;
    this.userId = data.userId;
    this.createdAt = data.createdAt;
  }

  /**
   * Create a new instance of this class.
   */
  static create(userId: ObjectID) {
    return new TempToken({
      _id: new ObjectID(),
      userId: userId,
      createdAt: new Date(),
    });
  }
}
