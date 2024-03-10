import { Prisma } from "@prisma/client";
import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class AuthorModel implements Prisma.AuthorCreateInput {
    @IsNumber()
    id: number;

    @IsNumber()
    bookId: number;

    @IsOptional()
    book?: Prisma.BookCreateNestedOneWithoutAuthorInput;

    @IsString()
    name: string;

    @IsDate()
    createdAt: Date;

    @IsDate()
    updatedAt: Date;
}

export class AuthorCreateDTO {
    @IsNumber()
    bookId: number;

    @IsString()
    name: string;
}

export class AuthorUpdateDTO {
    @IsNumber()
    bookId: number;

    @IsString()
    name: string;
}
