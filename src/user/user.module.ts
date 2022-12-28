import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "./user.controller";
import { User } from "./user.entity";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        TypeOrmModule.forFeature([User]),
        JwtModule.register({
            secret: 'Secret1234',
            signOptions: {
                expiresIn: 60 * 60,
            }
        }),],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule { }