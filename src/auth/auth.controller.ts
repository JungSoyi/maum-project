import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auto-credential.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) { }

    /**
     * username, password를 이용하여 회원가입을 합니다.
     * @param authCredentialsDto 
     * @returns 
     */
    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.authService.signUp(authCredentialsDto);
    }

    /**
     * username, password를 이용하여 로그인을 합니다.
     * @param authCredentialsDto 
     * @returns 
     */
    @Post('/signin')
    signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        return this.authService.singIn(authCredentialsDto)
    }
}
