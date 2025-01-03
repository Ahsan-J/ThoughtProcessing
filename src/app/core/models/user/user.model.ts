import { BaseModel } from "../base.model";

export interface IUser extends BaseModel {
  access_token: string;
  email: string;
  linkedin: null | string;
  name: string;
  profile: string;
  role: number;
  token_expiry: number;
}
