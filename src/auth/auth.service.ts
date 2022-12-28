// import { ConflictException, ForbiddenException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { AuthCredentialsDto } from './dto/auto-credential.dto';
// import { User } from '../user/user.entity';
// import { UserRepository } from 'src/user/user.repository';
// import *as bcrypt from 'bcryptjs';
// import { JwtService } from '@nestjs/jwt';
// import { LoggerService } from 'src/logger/logger.service';

// @Injectable()
// export class AuthService {

//     private readonly logger = new LoggerService();

//     constructor(
//         @InjectRepository(User)
//         private userRepository: UserRepository,
//         private jwtService: JwtService
//     ) { }

//     /**
//      * 회원가입 서비스 로직
//      * @param authCredentialsDto 
//      */
//     async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {

//         this.logger.log('회원가입을 시작합니다.');
//         const { username, password } = authCredentialsDto;

//         this.logger.log('비밀번호를 암호화합니다.');
//         const salt = await bcrypt.genSalt();
//         const hashedPassword = await bcrypt.hash(password, salt);

//         this.logger.log('새로운 사용자를 데이터베이스에 저장합니다.');
//         const user = this.userRepository.create({
//             username, password: hashedPassword
//         })

//         try {
//             await this.userRepository.save(user);
//         } catch (error) {
//             if (error.code === '23505') {
//                 this.logger.warn('이미 존재하는 사용자 이름입니다.');
//                 throw new ConflictException('Existing Username');
//             } else {
//                 throw new InternalServerErrorException();
//             }
//         }

//     }

//     /**
//      * 로그인 서비스 로직
//      * @param authCredentialsDto 
//      * @returns 
//      */
//     async singIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {

//         this.logger.log('로그인을 시작합니다.');
//         const { username, password } = authCredentialsDto;
//         const user = await this.userRepository.findOne({ username });

//         if (user && (await bcrypt.compare(password, user.password))) {
//             const payload = { username };
//             const accessToken = await this.jwtService.sign(payload);

//             return { accessToken };
//         } else {
//             this.logger.warn('인증에 실패했습니다.');
//             throw new ForbiddenException('아이디와 비밀번호를 다시 확인하십시오');
//         }
//     }
// }
