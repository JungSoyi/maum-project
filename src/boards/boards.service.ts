import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid';

@Injectable()
export class BoardsService {
    private boards: Board[] = [];

    /**
     * 게시판의 모든 게시글을 조회합니다.
     * @returns 
     */
    getAllBoards(): Board[] {
        return this.boards;
    }

    /**
     * 게시판에서 게시물을 작성합니다.
     * @param title 
     * @param description 
     */
    createBoard(title: string, description: string) {
        const board: Board = {
            id: uuid(),
            title,
            description,
            status: BoardStatus.PUBLIC,
        };
        /**
         * TODO: DB연결 하지 않아 id를 uuid로 사용함. 추후 수정 필요
         */

        this.boards.push(board);
        return board;
    }
}
