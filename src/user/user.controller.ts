import { Body, Controller, Delete, Get, HttpStatus, Param, ParseUUIDPipe, Patch, Post, Query, Res, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserService } from "./user.service";
import { Response } from 'express'
import { User } from "./user.entity";
import { UpdateUserDto } from "./dto/user.dto";
import { AuthCredentialsDto } from "src/auth/dto/auto-credential.dto";
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from "./get-user.decorator";
import {
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';

@Controller('user')
@ApiTags('User')
export class UserController {
    constructor(private readonly userService: UserService) { }

    /**
     * username, password를 이용하여 회원가입을 합니다.
     * @param authCredentialsDto 
     * @returns 
     */
    @Post('/signup')
    @ApiOperation({
        summary: '회원가입',
        description: '회원 가입 API'
    })
    @ApiCreatedResponse({
        description: '성공여부',
        schema: {
            example: { success: true },
        },
    })
    signUp(@Res() res: Response, @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto) {
        return this.userService.signUp(authCredentialsDto).then((result) => {
            res.status(HttpStatus.OK).json({ success: result });
        });
    }

    /**
     * @description username, password를 이용하여 로그인을 합니다.
     * @param authCredentialsDto 
     * @returns 
     */
    @Post('/signin')
    @ApiOperation({
        summary: '로그인 API',
        description: '아이디와 비밀번호를 이용해 로그인'
    })
    @ApiCreatedResponse({
        description: '로그인 정보',
        schema: {
            example: {
                id: 'cea1d926-6f1b-4a37-a46c-8ddf0b17a0bc',
                user_id: 'Soyi',
                name: '정소이',
                createdAt: '2021-12-25T23:30:51.371Z',
                updatedAt: '2021-12-25T23:30:51.371Z',
                deletedAt: null,
                token:
                    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNlYTFkOTI2LTZmMWItNGEzNy1hNDZjLThkZGYwYjE3YTBiYyIsInVzZXJfaWQiOiJSeWFuIiwic2FsdCI6IuyehOyLnCIsIm5hbWUiOiJSeWFuIiwiYWdlIjoyNSwiY3JlYXRlZEF0IjoiMjAyMS0xMi0yNVQyMzozMDo1MS4zNzFaIiwidXBkYXRlZEF0IjoiMjAyMS0xMi0yNVQyMzozMDo1MS4zNzFaIiwiZGVsZXRlZEF0IjpudWxsLCJpYXQiOjE2NDA1MDc0NzMsImV4cCI6MTY0MDUwNzUzM30.gm-Yf_C8szEOvcy-bK-r-CP4Nz6aCr1AgqvH8KonxvU',
            },
        },
    })
    signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        return this.userService.signIn(authCredentialsDto)
    }

    /**
     * @description 전체 유저를 조회합니다.
     */
    @Get()
    @ApiBearerAuth('access-token')
    @ApiOperation({
        summary: '전체 유저 조회',
        description: '전체 유저 조회 API'
    })
    @ApiCreatedResponse({
        description: '성공여부',
        schema: {
            example: {
                success: true,
                data: [
                    {
                        id: 'cea1d926-6f1b-4a37-a46c-8ddf0b17a0bc',
                        user_id: 'Soyi',
                        name: '정소이',
                        createdAt: '2021-12-25T23:30:51.371Z',
                        updatedAt: '2021-12-25T23:30:51.371Z',
                        deletedAt: null,
                    },
                ],
            },
        },
    })
    getAllUser(@Res() res: Response) {
        return this.userService.getAllUser().then((result) => {
            res.status(HttpStatus.OK).json({ success: true, data: result });
        });
    }

    /**
     * @description 유저의 정보를 조회합니다.
     * @param id 유저 아이디
     */
    @Get('/user/:id')
    findByUserId(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
        return this.userService.findByUserId(id);
    }

    /**
     * @description 유저 정보를 수정합니다.
     * @param id 유저 아이디
     * @param updateUserDto 유저 정보
     * @returns 
     */
    @Patch('/user/:id')
    @UsePipes(ValidationPipe)
    setUser(
        @Param('id', ParseUUIDPipe) id: number,
        @Body() updateUserDto: UpdateUserDto,
    ): Promise<boolean> {
        /**
         * TODO: patch 타입 에러 발생, 수정 필요
         */
        return this.userService.updateUser(id, updateUserDto);
    }

    /**
     * @description 회원이 탈퇴합니다.
     * @param id 유저아이디
     * @returns 
     */
    @Delete('/user/delete')
    deleteUser(@Query('id', ParseUUIDPipe) id: string): Promise<boolean> {
        return this.userService.deleteUser(id);
    }

}