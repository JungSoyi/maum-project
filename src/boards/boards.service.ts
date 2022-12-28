import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { v1 as uuid } from 'uuid';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';

import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {

    constructor(
        @InjectRepository(Board)
        private boardRepository: BoardRepository,
    ) { }

    async createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
        const { title, description } = createBoardDto;

        const board = this.boardRepository.create({
            title,
            description,
            status: BoardStatus.PUBLIC,
            user
        })

        await this.boardRepository.save(board);
        return board;

    }


    async getBoardById(id: number,
        user: User
    ): Promise<Board> {
        const found = await this.boardRepository.findOne({ where: { id, userId: user.id } });

        if (!found) {
            throw new NotFoundException(`Can't find Board with id ${id}`);

        }

        return found;
    }

    async deleteBoard(id: number): Promise<void> {
        const result = await this.boardRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Can't find Board with id ${id}`)
        }

        console.log('result', result);
    }

    async updateBoardStatus(id: number, status: BoardStatus, user: User): Promise<Board> {
        const board = await this.getBoardById(id, user);

        board.status = status;
        await this.boardRepository.save(board);

        return board;
    }

    async getAllBoards(): Promise<Board[]> {
        return this.boardRepository.find();
    }

    async getUserAllBoards(
        user: User,
    ): Promise<Board[]> {
        const query = this.boardRepository.createQueryBuilder('board');
        query.where('board.userId = :userId', { userId: user.id })

        const boards = await query.getMany();
        return boards;
    }

}
