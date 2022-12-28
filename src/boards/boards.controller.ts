import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/user/get-user.decorator';
import { User } from 'src/user/user.entity';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';

import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
    constructor(private boardsService: BoardsService) { }

    /**
     * 게시글을 작성합니다.
     * @param createBoardDto 
     * @returns 
     */
    @Post()
    @UsePipes(ValidationPipe)
    createBoard(@Body() createBoardDto: CreateBoardDto,
        @GetUser() user: User): Promise<Board> {
        return this.boardsService.createBoard(createBoardDto, user);
    }

    /**
     * id를 이용해서 특정 게시글을 조회합니다.
     * @param id 
     * @returns 
     */
    @Get('/:id')
    getBoardById(@Param('id', ParseIntPipe) id: number,
        @GetUser() user: User,
    ): Promise<Board> {

        return this.boardsService.getBoardById(id, user);

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
        @GetUser() user: User
    ) {
        return this.boardsService.updateBoardStatus(id, status, user);
    }


    /**
     * 로그인 한 유저의 모든 게시글을 조회합니다.
     * @param user 
     * @returns 
     */
    @Get()
    getUserAllBoard(
        @GetUser() user: User,
    ): Promise<Board[]> {
        return this.boardsService.getUserAllBoards(user);
    }
}
