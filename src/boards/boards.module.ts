import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from 'src/auth/auth.module';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Board]),
        AuthModule
    ],
    controllers: [BoardsController],
    providers: [BoardsService]
})
export class BoardsModule { }
