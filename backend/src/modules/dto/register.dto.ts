import { IsString, MinLength, IsEmail } from "class-validator";

export class RegisterDto {
    @IsString()
    @MinLength(1, { message: 'Username is required' })
    username!: string;
  
    @IsEmail({}, { message: 'Invalid email address' })
    email!: string;
  
    @IsString()
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password!: string;
  }
  