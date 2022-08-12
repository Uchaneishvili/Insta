import mongoose, { model, Schema } from "mongoose";
import { IType, IUser } from "../types/user";

const schema = new Schema(
  {
    image: {
      type: String,
    },
    type: {
      type: Number,
      enum: [IType.USER, IType.TAG],
    },
    userName: {
      type: String,
    },
    name: {
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

const UserModel = model<IUser>("user", schema);
export default UserModel;
