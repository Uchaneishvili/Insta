import { model, Schema } from "mongoose";
import { IType, IUser } from "../types/user";

const userSchema = new Schema(
  {
    image: {
      type: String,
    },
    type: {
      type: IType,
    },
    userName: {
      type: String,
    },
    mediaCount: {
      type: Number,
    },
  },
  {
    timestamps: true,
    collection: "users",
    writeConcern: {
      w: "majority",
      wtimeout: 15000,
    },
    read: "nearest",
  }
);

const UserModel = model<IUser>("user", userSchema);
export default UserModel;
