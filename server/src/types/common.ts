export interface IRegexQuery {
  [key: string]: {
    $regex: string;
    $options: string;
  };
}
