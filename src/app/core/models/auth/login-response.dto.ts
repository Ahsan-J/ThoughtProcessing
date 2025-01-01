import { IUser } from "../user/user.model";

export interface ILoginResponse {
    accessToken: string;
    user: IUser
}
