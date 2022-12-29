import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { GetUser } from "src/user/get-user.decorator";
import { User } from "src/user/user.entity";
import { CommentService } from "./comment.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { Comment } from "./entity/comment.entity";

@Controller('comment')
export class CommentController {

    constructor(private readonly commentService: CommentService) { }
    /**
     * @description 댓글을 작성합니다.
     * @param bodyData 
     * @param user 
     * @returns 
     */
    @Post()
    @UseGuards()
    createComment(
        @Body() bodyData: CreateCommentDto,
        @GetUser() user: User,
    ): Promise<any> {
        return this.commentService.createComment(bodyData, user);
    }

    /**
     * @description 전체 댓글을 조회합니다.
     * @returns 
     */
    @Get()
    getAllComments(): Promise<Comment[]> {
        return this.commentService.getAllComments();
    }

    /**
     * @description 특정 게시글의 댓글을 조회합니다.
     * @param id 
     * @returns 
     */
    @Get('/:id')
    getAllCommentsByBoard(@Param('id') id: string): Promise<Comment[]> {
        return this.commentService.getAllCommentsByBoard(+id);
    }

    /**
     * @description 댓글을 수정합니다.
     * @param id 
     * @param bodyData 
     * @param user 
     * @returns 
     */
    @Patch('/:id')
    @UseGuards()
    updateComment(
        @Param('id') id: string,
        @Body() bodyData: UpdateCommentDto,
        @GetUser() user: User,
    ) {
        return this.commentService.updateComment(+id, bodyData, user);
    }

    // /**
    //  * @description 댓글을 삭제합니다.
    //  * @param id 
    //  * @param user 
    //  * @returns 
    //  */
    // @Delete('/:id')
    // @UseGuards()
    // deleteComment(@Param('id') id: string, @GetUser() user: User) {
    //     return this.commentService.deleteComment(+id, user);
    // }

}