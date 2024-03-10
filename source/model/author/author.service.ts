import { Injectable } from "@nestjs/common";

import { ExtendService } from "../../global/extend.service";

import { PrismaService } from "../../provider/prisma.service";

import { AuthorModel, AuthorCreateDTO, AuthorUpdateDTO } from "./author";

interface AuthorServiceInterface {}

@Injectable()
export class AuthorService
    extends ExtendService<AuthorModel, AuthorCreateDTO, AuthorUpdateDTO>
    implements AuthorServiceInterface
{
    constructor(prismaService: PrismaService) {
        super(AuthorService.name, prismaService.author, { book: true });
    }
}
