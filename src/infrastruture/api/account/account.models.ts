import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { Match } from "../common/validation/match-with-property";


export class LoginModel {

    @IsEmail()
    @MaxLength(100, {})
    email: string;

    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(20)
    password: string;

    @IsNotEmpty()
    @MaxLength(2000)
    returnUrl: string;
}

export class LoginResult {
    constructor(public redirectUrl: string) {}
}


export class RegisterModel {

    @IsNotEmpty()
    @MaxLength(100, {})
    name: string;

    @IsEmail()
    @MaxLength(100, {})
    email: string;

    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(20)
    password: string;

    @Match(RegisterModel, x => x.password)
    confirmPassword: string;
}