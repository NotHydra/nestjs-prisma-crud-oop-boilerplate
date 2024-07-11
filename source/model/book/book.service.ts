import { Injectable } from "@nestjs/common";

import { PrismaService } from "./../../provider/prisma.service";

import { BaseService } from "./../../global/base.service";

import { BookModel, BookCreateDTO, BookUpdateDTO } from "./book";

interface BookServiceInterface {}

@Injectable()
export class BookService extends BaseService<BookModel, BookCreateDTO, BookUpdateDTO> implements BookServiceInterface {
    constructor(prismaService: PrismaService) {
        super(BookService.name, prismaService.book);
    }
}
