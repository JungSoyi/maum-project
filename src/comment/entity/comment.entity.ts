import { Board } from "src/boards/board.entity";
import { User } from "src/user/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    commentText: string;

    @Column()
    commentStatus: boolean;

    @Column()
    createdDate: Date;

    @Column()
    updatedDate: Date;

    @ManyToOne((type) => User, (user) => user.id)
    user: User;

    @ManyToOne((type) => Board, (board) => board.id)
    board: Board;


}