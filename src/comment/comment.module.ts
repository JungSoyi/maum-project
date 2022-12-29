import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { BoardsModule } from "src/boards/boards.module";
import { CommentController } from "./comment.controller";
import { CommentService } from "./comment.service";

@Module({
    imports: [AuthModule, BoardsModule, TypeOrmModule.forFeature([Comment])],
    controllers: [CommentController],
    providers: [CommentService],
})

export class CommentModule { }