import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginDto {
    @IsString()
    @MinLength(1, { message: 'Username is required' })
    @IsNotEmpty()
    username!: string;

    @IsString()
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    @IsNotEmpty()
    password!: string;
}
