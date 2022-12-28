import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auto-credential.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import *as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ) { }

    /**
     * 회원가입 서비스 로직
     * @param authCredentialsDto 
     */
    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {

        const { username, password } = authCredentialsDto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = this.userRepository.create({
            username, password: hashedPassword
        })

        try {
            await this.userRepository.save(user);
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('Existing Username');
            } else {
                throw new InternalServerErrorException();
            }
        }

    }

    /**
     * 로그인 서비스 로직
     * @param authCredentialsDto 
     * @returns 
     */
    async singIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        const { username, password } = authCredentialsDto;
        const user = await this.userRepository.findOne({ username });

        if (user && (await bcrypt.compare(password, user.password))) {
            const payload = { username };
            const accessToken = await this.jwtService.sign(payload);

            return { accessToken };
        } else {
            throw new UnauthorizedException('login Failed');
        }
    }
}
