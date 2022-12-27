import { Controller, Get } from '@nestjs/common';
import { BoardsService } from './boards.service';

@Controller('boards')
export class BoardsController {
    constructor(private boardsService: BoardsService, getAllBoards: BoardsService) { }

    /**
     * 모든 게시글을 조회합니다.
     * @returns 
     */
    @Get()
    getAllBoard() {
        return this.boardsService.getAllBoards();
    }

}
