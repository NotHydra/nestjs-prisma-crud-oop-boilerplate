import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";

import { Override } from "./../../common/decorator/override.decorator";

import { PrismaService } from "./../../provider/prisma.service";

import { DetailedService } from "./../../global/detailed.service";

import { AuthorModel, AuthorCreateDTO, AuthorUpdateDTO } from "./author";

interface AuthorServiceInterface {}

@Injectable()
export class AuthorService
    extends DetailedService<AuthorModel, AuthorCreateDTO, AuthorUpdateDTO>
    implements AuthorServiceInterface
{
    constructor(prismaService: PrismaService) {
        super(AuthorService.name, prismaService.author, { book: true });
    }

    @Override
    public async add(payload: AuthorCreateDTO): Promise<AuthorModel> {
        try {
            if (payload.name.length < 3) {
                throw new BadRequestException(`Name Must Be At Least 3 Characters Long`);
            }
        } catch (error) {
            if (error instanceof BadRequestException) {
                this.loggerService.error(`Add: ${error.message}`);

                throw error;
            }

            this.loggerService.error(`Add: ${error.message}`);

            throw new InternalServerErrorException("Internal Server Error");
        }

        return super.add(payload);
    }

    @Override
    public async change(id: number, payload: AuthorUpdateDTO): Promise<AuthorModel> {
        try {
            if (payload.name.length < 3) {
                throw new BadRequestException(`Name Must Be At Least 3 Characters Long`);
            }
        } catch (error) {
            if (error instanceof BadRequestException) {
                this.loggerService.error(`Change: ${error.message}`);

                throw error;
            }

            this.loggerService.error(`Change: ${error.message}`);

            throw new InternalServerErrorException("Internal Server Error");
        }

        return super.change(id, payload);
    }
}
