import { ConflictException, ForbiddenException, HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { UpdateUserDto } from "./dto/user.dto";
import { UserRepository } from "./user.repository";
import { LoggerService } from "src/logger/logger.service";
import { AuthCredentialsDto } from "src/auth/dto/auto-credential.dto";
import { JwtService } from "@nestjs/jwt";
import *as bcrypt from 'bcryptjs';
import { SignInDto } from "src/auth/dto/sign_in.dto";

@Injectable()
export class UserService {

    private readonly logger = new LoggerService();

    constructor(
        @InjectRepository(User)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ) { }

    /**
     * 회원가입 서비스 로직
     * @param authCredentialsDto 
     */
    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<boolean> {
        try {
            this.logger.log('회원가입을 시작합니다.');
            const { user_id, username, password } = authCredentialsDto;

            this.logger.log('비밀번호를 암호화합니다.');
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);

            this.logger.log('새로운 사용자를 데이터베이스에 저장합니다.');
            const user = this.userRepository.create({
                username, password: hashedPassword
            });
            await this.userRepository.save(user);
            return user ? true : false;

        } catch (error) {
            throw new HttpException(
                {
                    message: 'SQL 에러',
                    error: error.sqlMessage,
                },
                HttpStatus.FORBIDDEN,
            );
        }

    }

    /**
     * 로그인 서비스 로직
     * @param sign_in_dto
     * @returns 
     */
    async logIn(sign_in_dto: SignInDto): Promise<{ accessToken: string }> {

        this.logger.log('로그인을 시작합니다.');
        const { user_id, password } = sign_in_dto;
        const user = await this.userRepository.findOne({ user_id });

        if (user && (await bcrypt.compare(password, user.password))) {
            const payload = { user_id };
            const accessToken = await this.jwtService.sign(payload);

            return { accessToken };
        } else {
            this.logger.warn('인증에 실패했습니다.');
            throw new ForbiddenException('아이디와 비밀번호를 다시 확인하십시오');
        }
    }


    /**
     * @description 모든 유저 조회로직입니다.
     * @returns 
     */
    async getAllUser(): Promise<User[]> {
        return await this.userRepository.find();
    }

    /**
     * @description 단일 유저의 정보 조회로직입니다.
     * @param id 조회하려는 유저의 아이디
     * @returns 
     */
    async findByUserId(id: string): Promise<User> {
        const user = await this.userRepository.findOne(id);

        if (!user) {
            throw new HttpException(
                {
                    message: 1,
                    error: '유저를 찾을 수 없습니다.',
                },
                HttpStatus.NOT_FOUND,
            );
        }
        return user;
    }

    /**
     * @description 유저의 정보 수정로직입니다.
     * @param id 수정하려고 하는 유저의 아이디
     * @param updateUserDto 유저 정보
     * @returns 
     */
    async updateUser(id: number, updateUserDto: UpdateUserDto,): Promise<boolean> {
        const { password } = updateUserDto;

        /**
         * TODO:
         * Patch id 타입 에러 발생 수정 필요
         */
        const changeUser = await this.userRepository.update({ id }, { password });

        if (changeUser.affected !== 1) {
            throw new NotFoundException('유저가 존재하지 않습니다.');
        }

        return true;
    }

    /**
     * @description 회원탈퇴 로직입니다.
     * @param id 삭제하는 유저의 아이디
     * @returns 
     */
    async deleteUser(id: string): Promise<boolean> {
        const deleteUser = await this.userRepository.delete(id);

        if (deleteUser.affected === 0) {
            throw new NotFoundException('유저가 존재하지 않습니다.');
        }
        return true;
    }





}