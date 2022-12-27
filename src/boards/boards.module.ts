import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Board } from './board.entity';
// import { TypeOrmExModule } from 'src/typeorm/typeorm-ex.module';
import { BoardRepository } from './board.repository';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Board]),
    ],
    controllers: [BoardsController],
    providers: [BoardsService]
})
export class BoardsModule { }
