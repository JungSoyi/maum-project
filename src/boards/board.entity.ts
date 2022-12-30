import { type } from "os";
import { User } from "src/user/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BoardStatus } from "./board-status.enum";

@Entity()
export class Board extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: BoardStatus;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    createdDate: Date;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    updatedDate: Date;

    @ManyToOne(type => User, user => user.id)
    user: User;

    @Column()
    userId: number;

}