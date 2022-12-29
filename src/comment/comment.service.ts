import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Board } from "src/boards/board.entity";
import { BoardsService } from "src/boards/boards.service";
import { User } from "src/user/user.entity";
import { Repository } from "typeorm";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { Comment } from "./entity/comment.entity";

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment)
        private commentRepository: Repository<Comment>,
        private boardsService: BoardsService,
    ) { }

    async createComment(bodyData: CreateCommentDto, user: User) {
        const comment = new Comment();
        const board = new Board();

        board.id = bodyData.boardId;
        comment.board = board;
        comment.user = user;
        comment.commentText = bodyData.commentText;
        const response = await this.commentRepository.save(comment);

        console.log(response);

    }

    getAllComments(): Promise<Comment[]> {
        return this.commentRepository.find();
    }

    getAllCommentsByBoard(id: number): Promise<Comment[]> {
        const found = this.commentRepository.find({
            where: { board: id },
        });

        if (!found) {
            throw new NotFoundException('게시글을 찾을 수 없습니다.')
        }
        return found;
    }

    findOne(id: number) {
        return `이 액션은 id ${id} Comment를 반환합니다.`;
    }

    async updateComment(id: number, bodyData: UpdateCommentDto, user: User) {
        const { commentText, commentStatus } = bodyData;

        const found = await this.commentRepository.findOne({ id, user });

        if (!found) {
            throw new NotFoundException("댓글이 없습니다.")
        }

        if (commentText) {
            found.commentText = commentText;
            found.updatedDate = new Date();
        }

        if (commentStatus) {
            found.commentStatus = commentStatus;
            found.updatedDate = new Date();
        }

        await this.commentRepository.save(found);
        return found;
    }

    async deleteComment(id: number, user: User) {
        const query = this.commentRepository.createQueryBuilder('bc');
        query.select('b.userId');
        query.innerJoin(Board, 'b', 'bc.boardId = b.id');
        query.where('bc.id = :id', { id });
        const result = await query.getRawMany();

        const commentUser = await this.commentRepository.findOne({ id, user });
        let deleted = null;
        if (result && result[0].userId == user.id) {
            deleted = await this.commentRepository.delete({ id });
        } else if (commentUser) {
            deleted = await this.commentRepository.delete({ id, user });
            if (deleted.affected === 0) {
                throw new NotFoundException(`id ${id}인 댓글을 찾을 수 없습니다.`);
            }
        } else {
            throw new UnauthorizedException(
                '댓글 삭제 권한이 없습니다.',
            );
        }
    }
}