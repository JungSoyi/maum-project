import { Board } from "src/boards/board.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['user_id'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    createdDate: Date;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    updatedDate: Date;

    @Column({ default: true })
    status: boolean;

    @OneToMany(type => Board, board => board.user, { eager: true })
    boards: Board[];


}