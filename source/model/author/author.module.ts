import { Module } from "@nestjs/common";

import { PrismaService } from "./../../provider/prisma.service";

import { AuthorController } from "./author.controller";
import { AuthorService } from "./author.service";

@Module({
    controllers: [AuthorController],
    providers: [PrismaService, AuthorService],
})
export class AuthorModule {}
