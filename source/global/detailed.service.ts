import { InternalServerErrorException, NotFoundException } from "@nestjs/common";

import { PrismaModelInterface } from "./../common/interface/prisma-model.interface";

import { BaseService } from "./base.service";

interface DetailedInterface {
    [key: string]: { include: DetailedInterface } | boolean;
}

export class DetailedService<ModelType, ModelCreateDTO, ModelUpdateDTO> extends BaseService<
    ModelType,
    ModelCreateDTO,
    ModelUpdateDTO
> {
    protected readonly detailed: DetailedInterface;

    constructor(
        serviceName: string,
        protected readonly prismaModel: PrismaModelInterface<ModelType>,
        detailed: DetailedInterface
    ) {
        super(serviceName, prismaModel);

        this.detailed = detailed;
    }

    public async findDetailed(page: number = 0, count: number = 0): Promise<ModelType[]> {
        try {
            const models: ModelType[] =
                page !== 0 && count !== 0
                    ? await this.prismaModel.findMany({
                          skip: (page - 1) * count,
                          take: count,
                          include: this.detailed,
                      })
                    : await this.prismaModel.findMany({ include: this.detailed });

            this.loggerService.log(`Find Detailed: ${JSON.stringify(models)}`);

            return models;
        } catch (error) {
            this.loggerService.error(`Find Detailed: ${error.message}`);
            throw new InternalServerErrorException("Internal Server Error");
        }
    }

    public async findIdDetailed(id: number): Promise<ModelType> {
        try {
            const model: ModelType = await this.prismaModel.findUnique({
                where: { id },
                include: this.detailed,
            });

            if (!model) {
                throw new NotFoundException(`Id ${id} Not Found`);
            }

            this.loggerService.log(`Find Id Detailed: ${JSON.stringify(model)}`);

            return model;
        } catch (error) {
            if (error instanceof NotFoundException) {
                this.loggerService.error(`Find Id Detailed: ${error.message}`);
                throw error;
            }

            this.loggerService.error(`Find Id Detailed: ${error.message}`);

            throw new InternalServerErrorException("Internal Server Error");
        }
    }
}
