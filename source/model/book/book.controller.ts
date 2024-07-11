import { Controller, UseInterceptors } from "@nestjs/common";

import { ResponseFormatInterceptor } from "./../../common/interceptor/response-format.interceptor";

import { BaseController } from "./../../global/base.controller";

import { BookModel, BookCreateDTO, BookUpdateDTO } from "./book";
import { BookService } from "./book.service";

interface BookControllerInterface {}

@Controller("book")
@UseInterceptors(ResponseFormatInterceptor)
export class BookController
    extends BaseController<BookModel, BookCreateDTO, BookUpdateDTO, BookService>
    implements BookControllerInterface
{
    constructor(modelService: BookService) {
        super(BookController.name, modelService);
    }
}
