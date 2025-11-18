import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { VerifyEmailDTO } from './dto/verify-email.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { UserInfo } from './UserInfo';

@Controller('users')
export class UsersController {
    @Post()
    async createUser(@Body() dto: CreateUserDTO): Promise<void>{
        console.log(dto);
        return;
    }

    @Post('/email-verify')
    async verifyEmail(@Query() dto: VerifyEmailDTO): Promise<void>{
        console.log(dto);
        return;
    }

    @Post('/login')
    async login(@Body() dto: UserLoginDto): Promise<void>{
        console.log(dto);
        return;
    }

    @Get("/:id")
    async getUserInfo(@Param('id') userId: string): Promise<void>{
        console.log(userId);
        return;
    }

}
