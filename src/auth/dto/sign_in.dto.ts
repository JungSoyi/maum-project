import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class SignInDto {
    @ApiProperty({
        example: 'Soyi',
        description: '사용자 아이디',
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    user_id: string;

    @ApiProperty({
        example: 'test1234',
        description: '사용자 비밀번호',
        required: true
    })
    @IsNotEmpty()
    @IsString()
    @Matches(/^[a-zA-Z0-9]*$/, {
        message: 'password only accepts english and number'
    })
    password: string;
}