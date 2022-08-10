import { IRegexQuery } from "./common";

export interface IDocumentQuery {
  _id?: string | { $in: string[] };
  createdAt?: {
    $gte?: Date;
    $lte?: Date;
  };
  isActive?: boolean;
  $or?: IRegexQuery[];
  startDate?: {
    $gte?: Date;
    $lte?: Date;
  };
  endDate?: {
    $gte: Date;
  };
  account?: string;
}
