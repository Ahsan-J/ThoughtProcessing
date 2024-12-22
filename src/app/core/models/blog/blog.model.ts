import { BaseModel } from "../base.model";
import { IUser } from "../user/user.model";

export interface IBlog extends BaseModel {
  content: string;
  description: string;
  title: string;
  author?: IUser | null;
  likes: number;
  comments: number;
  cover: string;
}
