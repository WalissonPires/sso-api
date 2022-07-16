

export interface IUserInfo {
    userId: string;
}

export interface IRequestWithUser extends Request {
    user: IUserInfo;
}