import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
export class BoardsController {
    constructor(private boardsService: BoardsService) { }

    /**
     * 게시글을 작성합니다.
     * @param createBoardDto 
     * @returns 
     */
    @Post()
    @UsePipes(ValidationPipe)
    createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
        return this.boardsService.createBoard(createBoardDto);
    }

    /**
     * id를 이용해서 특정 게시글을 조회합니다.
     * @param id 
     * @returns 
     */
    @Get('/:id')
    getBoardById(@Param('id') id: number): Promise<Board> {

        return this.boardsService.getBoardById(id);

    }

    /**
     * 게시글의 id를 이용해서 특정 게시글을 삭제합니다.
     * @param id 
     * @returns 
     */
    @Delete('/:id')
    deleteBoard(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.boardsService.deleteBoard(id);
    }

    /**
     * 게시글의 id를 이용해서 특정 게시글의 상태를 변경합니다.
     * @param id 
     * @param status 
     * @returns 
     */
    @Patch('/:id/status')
    updateBoardStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', BoardStatusValidationPipe) status: BoardStatus,
    ): Promise<Board> {
        return this.boardsService.updateBoardStatus(id, status);
    }

    /**
     * 등록된 모든 게시글을 조회합니다.
     * @returns 
     */
    @Get()
    getAllBoard(): Promise<Board[]> {
        return this.boardsService.getAlllBoards();
    }
}
