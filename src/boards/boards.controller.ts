import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

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
    @UsePipes(ValidationPipe)
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

    /**
     * 게시글의 상태를 수정합니다.
     * @param id 
     * @param status 
     * @returns 
     */
    @Patch('/:id/status')
    updateBoardStatus(@Param('id') id: string,
        @Body('status', BoardStatusValidationPipe) status: BoardStatus,): Board {
        return this.boardsService.updateBoardStatus(id, status);
    }


}
