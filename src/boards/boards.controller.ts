import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Board } from './board.model';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('boards')
export class BoardsController {
    constructor(private boardsService: BoardsService) { }

    /**
     * 모든 게시글을 조회합니다.
     * @returns 
     */
    @Get('/')
    getAllBoard(): Board[] {
        return this.boardsService.getAllBoards();
    }

    /**
     * 게시글을 작성합니다.
     * @param createBoardDto 
     * @returns 
     */
    @Post()
    createBoard(@Body() createBoardDto: CreateBoardDto): Board {

        return this.boardsService.createBoard(createBoardDto);

    }

    /**
     * 특정 게시글을 조회합니다.
     * @param id 
     * @returns 
     */
    @Get('/:id')
    getBoardById(@Param('id') id: string): Board {
        return this.boardsService.getBoardById(id);
    }

    /**
     * 특정 게시글을 삭제합니다.
     * @param id 
     */
    @Delete('/:id')
    deleteBoard(@Param('id') id: string): void {

        this.boardsService.deleteBoard(id);

    }
}
