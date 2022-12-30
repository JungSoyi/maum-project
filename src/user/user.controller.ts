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
     * username, password를 이용하여 로그인을 합니다.
     * @param authCredentialsDto 
     * @returns 
     */
    @Post('/signin')
    signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        return this.userService.signIn(authCredentialsDto)
    }

    @Post('/getuser')
    @UseGuards(AuthGuard())
    getUser(@GetUser() user: User) {

    }
    /**
     * @description 전체 유저를 조회합니다.
     */
    @Get()
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