import { BaseModel } from "./app";
import { IUser } from "./user";

export interface IBlog extends BaseModel {
  content: string;
  description: string;
  title: string;
  author?: IUser | null;
  commentsCount: number,
  likes: number,
}

export enum BlogStatus {
  Active = 1,
  Draft = 2,
  Block = 4,
}
