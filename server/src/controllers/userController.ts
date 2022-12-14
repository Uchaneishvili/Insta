import { Request, Response } from "express";
import {
  createdResponse,
  handleError,
  recordNotFound,
  successResponse,
} from "../util/apiResponse";
import { generatePaging } from "../util/generatePaging";
import UserModel from "../models/userModel";
import { IUser, IUserQuery } from "../types/user";

export class UserController {
  public async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const [skip, limit] = generatePaging(req);
      const query: IUserQuery = {};

      const [users, totalCount] = await Promise.all([
        await UserModel.find(query)
          .lean()
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .exec(),
        await UserModel.countDocuments(query),
      ]);

      return successResponse({ users, totalCount }, res);
    } catch (error) {
      return handleError(error, res, "Error while searching users.");
    }
  }

  public async getUserInfo(req: Request, res: Response): Promise<void> {
    try {
      const user = await UserModel.findById({ _id: req.params.id });

      return successResponse(user, res);
    } catch (error) {
      return handleError(error, res, "Error while searching users.");
    }
  }

  public async login(req: Request, res: Response): Promise<void> {
    try {
      console.log(req.body);
      const isFound = await UserModel.find({
        userName: req.body.username,
        password: req.body.password,
      });

      let success = false;
      if (isFound) {
        success = true;
      }

      return successResponse({ success: success }, res);
    } catch (error) {
      return handleError(error, res, "Error while searching users.");
    }
  }

  public async addUser(req: Request, res: Response): Promise<void> {
    try {
      console.log(req.file);
      const data: IUser = { ...req.body };

      const savedLedger: IUser = await new UserModel(data).save();

      return createdResponse(savedLedger, res);
    } catch (error) {
      return handleError(error, res, "Error while adding user.");
    }
  }

  public async updateUsers(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const data = req.body;

      const prevRec = await UserModel.findById({ _id: req.params.id })
        .lean()
        .exec();

      if (!prevRec) {
        return recordNotFound(res);
      }

      const user = await UserModel.findByIdAndUpdate(
        id,
        {
          $set: data,
        },
        {
          new: true,
        }
      );
      return successResponse(user, res);
    } catch (error) {
      return handleError(error, res);
    }
  }
  public async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const removedUser = await UserModel.findByIdAndRemove(id);

      return successResponse(removedUser, res);
    } catch (error) {
      return handleError(error, res);
    }
  }
}
