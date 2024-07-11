import { BadRequestException, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import { PrismaModelInterface } from "./../common/interface/prisma-model.interface";

import { LoggerService } from "./../provider/logger.service";

export class BaseService<ModelType, ModelCreateDTO, ModelUpdateDTO> {
    protected readonly loggerService: LoggerService;

    constructor(
        serviceName: string,
        protected readonly prismaModel: PrismaModelInterface<ModelType>
    ) {
        this.loggerService = new LoggerService(serviceName);
    }

    public async find(page: number = 0, count: number = 0): Promise<ModelType[]> {
        try {
            const models: ModelType[] =
                page !== 0 && count !== 0
                    ? await this.prismaModel.findMany({ skip: (page - 1) * count, take: count })
                    : await this.prismaModel.findMany();

            this.loggerService.log(`Find: ${JSON.stringify(models)}`);

            return models;
        } catch (error) {
            this.loggerService.error(`Find: ${error.message}`);

            throw new InternalServerErrorException("Internal Server Error");
        }
    }

    public async findId(id: number): Promise<ModelType> {
        try {
            const model: ModelType = await this.prismaModel.findUnique({ where: { id } });

            if (!model) {
                throw new NotFoundException(`Id ${id} Not Found`);
            }

            this.loggerService.log(`Find Id: ${JSON.stringify(model)}`);

            return model;
        } catch (error) {
            if (error instanceof NotFoundException) {
                this.loggerService.error(`Find Id: ${error.message}`);

                throw error;
            }

            this.loggerService.error(`Find Id: ${error.message}`);

            throw new InternalServerErrorException("Internal Server Error");
        }
    }

    public async add(payload: ModelCreateDTO): Promise<ModelType> {
        try {
            const model: ModelType = await this.prismaModel.create({ data: payload });

            this.loggerService.log(`Add: ${JSON.stringify(model)}`);

            return model;
        } catch (error) {
            if (error instanceof BadRequestException) {
                this.loggerService.error(`Add: ${error.message}`);

                throw error;
            }

            if (error instanceof PrismaClientKnownRequestError) {
                this.loggerService.error("Add: Invalid Payload");

                throw new BadRequestException("Invalid Payload");
            }

            this.loggerService.error(`Add: ${error.message}`);

            throw new InternalServerErrorException("Internal Server Error");
        }
    }

    public async change(id: number, payload: ModelUpdateDTO): Promise<ModelType> {
        try {
            const model: ModelType = await this.prismaModel.update({
                where: { id },
                data: payload,
            });

            if (!model) {
                throw new NotFoundException(`Id ${id} Not Found`);
            }

            this.loggerService.log(`Change: ${JSON.stringify(model)}`);

            return model;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                this.loggerService.error(`Change: Id ${id} Not Found`);

                throw new NotFoundException(`Id ${id} Not Found`);
            }

            if (error instanceof NotFoundException) {
                this.loggerService.error(`Change: ${error.message}`);

                throw error;
            }

            this.loggerService.error(`Change: ${error.message}`);

            throw new InternalServerErrorException("Internal Server Error");
        }
    }

    public async remove(id: number): Promise<ModelType> {
        try {
            const model: ModelType = await this.prismaModel.delete({ where: { id } });

            if (!model) {
                throw new NotFoundException(`Id ${id} Not Found`);
            }

            this.loggerService.log(`Remove: ${JSON.stringify(model)}`);

            return model;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                this.loggerService.error(`Remove: Id ${id} Not Found`);

                throw new NotFoundException(`Id ${id} Not Found`);
            }

            if (error instanceof NotFoundException) {
                this.loggerService.error(`Remove: ${error.message}`);

                throw error;
            }

            this.loggerService.error(`Remove: ${error.message}`);

            throw new InternalServerErrorException("Internal Server Error");
        }
    }
}
