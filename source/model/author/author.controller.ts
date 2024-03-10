import { Controller, UseInterceptors } from "@nestjs/common";

import { ResponseFormatInterceptor } from "../../common/interceptor/response-format.interceptor";

import { ExtendController } from "../../global/extend.controller";

import { AuthorModel, AuthorCreateDTO, AuthorUpdateDTO } from "./author";
import { AuthorService } from "./author.service";

interface AuthorControllerInterface {}

@Controller("author")
@UseInterceptors(ResponseFormatInterceptor)
export class AuthorController
    extends ExtendController<AuthorModel, AuthorCreateDTO, AuthorUpdateDTO, AuthorService>
    implements AuthorControllerInterface
{
    constructor(modelService: AuthorService) {
        super(AuthorController.name, modelService);
    }
}
