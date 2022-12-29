import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

export class CreateCommentDto {
    @IsString()
    @MaxLength(100)
    commentText: string;

    @IsNumber()
    @IsNotEmpty()
    boardId: number;
}