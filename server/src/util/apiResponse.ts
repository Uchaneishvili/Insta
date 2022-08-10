import { Response } from "express";

import { Logger } from "./Logger";

export enum ResponseStatusCodes {
  Success = 200,
  BadRequest = 400,
  InternalServerError = 500,
  Conflict = 409,
  NotFound = 404,
  Created = 201,
  Unauthorized = 401,
  forbidden = 403,
}

export function successResponse(data: unknown, res: Response): void {
  res.status(ResponseStatusCodes.Success).json({
    status: "SUCCESS",
    data,
  });
}

export function createdResponse(data: unknown, res: Response): void {
  res.status(ResponseStatusCodes.Created).json({
    status: "SUCCESS",
    data,
  });
}

export function failureResponse(
  message: string,
  data: unknown,
  res: Response
): void {
  res.status(ResponseStatusCodes.Success).json({
    status: "FAILURE",
    message,
    data,
  });
}

export function insufficientParameters(
  res: Response,
  keys: Array<string> = []
): void {
  res.status(ResponseStatusCodes.BadRequest).json({
    status: "FAILURE",
    message: `Insufficient parameters: ${keys.join(", ")}`,
    data: {},
  });
}

export function invalidParameters(
  res: Response,
  keys: Array<string> | string,
  additionalMsg = ""
): void {
  if (additionalMsg) {
    additionalMsg = ` ${additionalMsg}`;
  }

  if (typeof keys === "string") {
    keys = [keys];
  }

  keys = keys || [];

  res.status(ResponseStatusCodes.BadRequest).json({
    status: "FAILURE",
    message: `Invalid parameters: ${keys.join(", ")}.${additionalMsg}`,
    data: {},
  });
}

export function recordAlreadyExists(res: Response): void {
  res.status(ResponseStatusCodes.Conflict).json({
    status: "FAILURE",
    message: `Record already exists with given properties`,
    data: {},
  });
}

export function recordNotFound(res: Response): void {
  res.status(ResponseStatusCodes.NotFound).json({
    status: "FAILURE",
    message: `Record Not Found.`,
    data: {},
  });
}

export function handleError(
  err: unknown,
  res: Response,
  message?: string
): void {
  const error = {
    status: "FAILURE",
    message: message || "MongoDB error",
    err,
  };
  Logger.error(error);
  res.status(ResponseStatusCodes.InternalServerError).json(error);
}

export function unauthorized(res: Response, message = "unauthorized!"): void {
  res.status(ResponseStatusCodes.Unauthorized).json({
    status: "FAILURE",
    message: message,
  });
}

export function forbidden(res: Response, message = "forbidden!"): void {
  res.status(ResponseStatusCodes.forbidden).json({
    status: "FAILURE",
    message: message,
  });
}
