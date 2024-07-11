import { Prisma } from "@prisma/client";

import { IsArray, IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class BookModel implements Prisma.BookCreateInput {
    @IsNumber()
    id: number;

    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsNumber()
    page: number;

    @IsOptional()
    @IsArray()
    author?: Prisma.AuthorCreateNestedManyWithoutBookInput;

    @IsDate()
    createdAt: Date;

    @IsDate()
    updatedAt: Date;
}

export class BookCreateDTO {
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsNumber()
    page: number;
}

export class BookUpdateDTO {
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsNumber()
    page: number;
}
