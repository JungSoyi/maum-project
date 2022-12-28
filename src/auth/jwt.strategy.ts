import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { validate } from "class-validator";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "../user/user.entity";
import { UserRepository } from "src/user/user.repository";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        @InjectRepository(User)
        private userRepository: UserRepository
    ) {
        super({
            secretOrKey: 'Secret1234',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validate(payload) {
        const { username } = payload;
        const user: User = await this.userRepository.findOne({ username });

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}