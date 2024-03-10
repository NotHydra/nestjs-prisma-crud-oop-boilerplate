import { Module } from "@nestjs/common";
import { ConfigModule } from "./config/config.module";
import { BookModule } from "./model/book/book.module";

@Module({
    imports: [ConfigModule, BookModule],
})
export class AppModule {}
