import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
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


}
