import { BaseModel } from "./app";
import { IUser } from "./user";

export interface IBlog extends BaseModel {
  content: string;
  description: string;
  title: string;
  author?: IUser | null;
  comments: number,
  likes: number,
}
