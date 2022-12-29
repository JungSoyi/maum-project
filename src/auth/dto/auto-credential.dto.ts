import { IsString, MaxLength, MinLength, Matches, isNotEmpty, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AuthCredentialsDto {


    /**사용자 아이디 */
    @ApiProperty({
        example: 'Soyi',
        description: '사용자아이디',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    user_id: string;

    /**사용자 이름 */
    @ApiProperty({
        example: '정소이',
        description: '사용자이름',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    /**사용자 비밀번호 */
    @ApiProperty({
        example: 'test1234',
        description: '사용자비밀번호',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/^[a-zA-Z0-9]*$/, {
        message: 'password only accepts english and number'
    })
    password: string;
}