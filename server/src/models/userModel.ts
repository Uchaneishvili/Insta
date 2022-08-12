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
      required: true,
      unique: true,
    },

    name: {
      type: String,
    },
    password: {
      type: String,
      required: true,
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
