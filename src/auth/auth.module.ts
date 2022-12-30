import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from 'src/user/user.controller';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';
import { JwtStrategy } from './jwt.strategy';

/**
 * 토큰 유효 시간 : 3600초(1시간)
 */
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'Secret1234',
      signOptions: {
        expiresIn: 60 * 60,
      }
    }),
    TypeOrmModule.forFeature([User])
  ],
  controllers: [UserController],
  providers: [JwtStrategy],
  exports: [JwtStrategy, PassportModule]
})
export class AuthModule { }
