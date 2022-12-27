import { TypeOrmModuleOptions } from "@nestjs/typeorm"
import { Board } from "src/boards/board.entity"

export const typeORMConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'board',
    entities: [__dirname + '/../**/*.entity.{js,ts}', Board],
    synchronize: true,
}