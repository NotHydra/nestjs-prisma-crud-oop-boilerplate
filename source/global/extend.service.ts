import { InternalServerErrorException, NotFoundException } from "@nestjs/common";

import { PrismaModel } from "../common/interface/prisma-model";

import { BaseService } from "./base.service";

interface ExtendInterface {
    [key: string]: { include: ExtendInterface } | boolean;
}

export class ExtendService<ModelType, ModelCreateDTO, ModelUpdateDTO> extends BaseService<
    ModelType,
    ModelCreateDTO,
    ModelUpdateDTO
> {
    protected readonly extend: ExtendInterface;

    constructor(
        serviceName: string,
        protected readonly prismaModel: PrismaModel<ModelType>,
        extend: ExtendInterface
    ) {
        super(serviceName, prismaModel);

        this.extend = extend;
    }

    public async findExtend(page: number = 0, count: number = 0): Promise<ModelType[]> {
        try {
            let models: ModelType[];

            if (page !== 0 && count !== 0) {
                models = await this.prismaModel.findMany({
                    skip: (page - 1) * count,
                    take: count,
                    include: this.extend,
                });
            } else {
                models = await this.prismaModel.findMany({ include: this.extend });
            }

            this.loggerService.log(`Find Extend: ${JSON.stringify(models)}`);

            return models;
        } catch (error) {
            this.loggerService.error(`Find Extend: ${error.message}`);
            throw new InternalServerErrorException("Internal Server Error");
        }
    }

    public async findIdExtend(id: number): Promise<ModelType> {
        try {
            const model: ModelType = await this.prismaModel.findUnique({
                where: { id },
                include: this.extend,
            });

            if (!model) {
                throw new NotFoundException(`Id ${id} Not Found`);
            }

            this.loggerService.log(`Find Id Extend: ${JSON.stringify(model)}`);

            return model;
        } catch (error) {
            if (error instanceof NotFoundException) {
                this.loggerService.error(`Find Id Extend: ${error.message}`);
                throw error;
            }

            this.loggerService.error(`Find Id Extend: ${error.message}`);
            
            throw new InternalServerErrorException("Internal Server Error");
        }
    }
}
