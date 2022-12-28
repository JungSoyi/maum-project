import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Logger } from 'src/logger/logger.decorator';
import { LoggerService } from 'src/logger/logger.service';
import { v1 as uuid } from 'uuid';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';

import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
    private readonly logger = new LoggerService();

    constructor(
        @InjectRepository(Board)
        private boardRepository: BoardRepository,
    ) { }

    async createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
        this.logger.log('게시글 생성을 시작합니다.');
        const { title, description } = createBoardDto;

        const board = this.boardRepository.create({
            title,
            description,
            status: BoardStatus.PUBLIC,
            user
        })

        this.logger.log('게시글을 저장합니다.');
        await this.boardRepository.save(board);
        return board;

    }


    async getBoardById(id: number,
        user: User
    ): Promise<Board> {
        this.logger.log('특정 게시글을 조회합니다.');
        const found = await this.boardRepository.findOne({ where: { id, userId: user.id } });

        if (!found) {
            throw new NotFoundException(`Can't find Board with id ${id}`);

        }

        return found;
    }

    async deleteBoard(id: number): Promise<void> {
        this.logger.log('게시글을 삭제합니다.');
        const result = await this.boardRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Can't find Board with id ${id}`)
        }

        console.log('result', result);
    }

    async updateBoardStatus(id: number, status: BoardStatus, user: User): Promise<Board> {
        this.logger.log('게시글의 상태를 수정합니다.');
        const board = await this.getBoardById(id, user);

        board.status = status;
        await this.boardRepository.save(board);

        return board;
    }

    async getAllBoards(): Promise<Board[]> {
        this.logger.log('전체 게시글을 조회합니다.');
        return this.boardRepository.find();
    }

    async getUserAllBoards(
        user: User,
    ): Promise<Board[]> {
        this.logger.log('로그인한 유저가 작성한 모든 게시글을 조회합니다.');
        const query = this.boardRepository.createQueryBuilder('board');
        query.where('board.userId = :userId', { userId: user.id })

        const boards = await query.getMany();
        return boards;
    }

}
