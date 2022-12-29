import { Board } from "src/boards/board.entity";
import { User } from "src/user/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne((type) => User, (user) => user.id)
    user: User;

    @ManyToOne((type) => Board, (board) => board.id)
    board: Board;

    @Column()
    commentText: string;

    @Column({ default: true })
    commentStatus: boolean;

    @Column({ default: () => 'CUURENT_TIMESTAMP' })
    createdDate: Date;

    @Column({ default: () => 'CUURENT_TIMESTAMP' })
    updatedDate: Date;


}