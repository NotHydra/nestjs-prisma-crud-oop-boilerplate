import { Module } from "@nestjs/common";

import { PrismaService } from "../../provider/prisma.service";

import { BookController } from "./book.controller";
import { BookService } from "./book.service";

@Module({
    controllers: [BookController],
    providers: [PrismaService, BookService],
})
export class BookModule {}
