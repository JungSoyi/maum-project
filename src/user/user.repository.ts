import { HttpException, HttpStatus, NotFoundException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { UpdateUserDto } from "./dto/user.dto";
import { User } from "./user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    // /**
    //  * @description 모든 유저를 조회하는 로직
    //  * @returns 
    //  */
    // async findAll(): Promise<User[]> {
    //     return await this.find();
    // }

    // /**
    //  * @description 특정 유저를 조회합니다.
    //  * @param id 유저 아이디
    //  * @returns 
    //  */
    // async findById(id: string): Promise<User> {
    //     const user = await this.findOne(id);

    //     if (!user) {
    //         throw new HttpException(
    //             {
    //                 message: 1,
    //                 error: '유저를 찾을 수 없습니다.',
    //             },
    //             HttpStatus.NOT_FOUND,
    //         );
    //     }
    //     return user;
    // }

    // /**
    //  * @description 유저정보를 수정합니다.
    //  * @param id 유저 아이디
    //  * @param updateUserDto 유저 정보
    //  * @returns 
    //  */
    // async onChangeUser(
    //     id: number,
    //     updateUserDto: UpdateUserDto,
    // ): Promise<boolean> {
    //     const { password } = updateUserDto;

    //     const changeUser = await this.update({ id }, { password });

    //     if (changeUser.affected !== 1) {
    //         throw new NotFoundException('유저가 존재하지 않습니다.');
    //     }

    //     return true;
    // }

    // async onDelete(id: number): Promise<boolean> {
    //     const deleteUser = await this.delete(id);

    //     if (deleteUser.affected === 0) {
    //         throw new NotFoundException('유저가 존재하지 않습니다.');
    //     }

    //     return true;
    // }




}