import { Module } from "@nestjs/common";

import { ConfigModule } from "./config/config.module";

import { BookModule } from "./model/book/book.module";
import { AuthorModule } from "./model/author/author.module";

@Module({
    imports: [ConfigModule, BookModule, AuthorModule],
})
export class AppModule {}
