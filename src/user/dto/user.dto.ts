import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class UpdateUserDto {


    /**사용자 아이디 */
    @IsString()
    @IsNotEmpty()
    user_id: string;

    /**사용자 이름 */
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    /**사용자 비밀번호 */
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/^[a-zA-Z0-9]*$/, {
        message: 'password only accepts english and number'
    })
    password: string;

}