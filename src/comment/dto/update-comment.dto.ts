import { PartialType } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";
import { CreateCommentDto } from "./create-comment.dto";

export class UpdateCommentDto extends PartialType(CreateCommentDto) {
    @IsString()
    @IsNotEmpty()
    commentText?: string;

    @IsBoolean()
    commentStatus?: boolean;
}