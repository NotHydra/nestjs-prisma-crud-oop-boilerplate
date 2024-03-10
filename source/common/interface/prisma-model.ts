export interface PrismaModel<ModelType> {
    findMany(options?: any): Promise<ModelType[]>;
    findUnique(options?: any): Promise<ModelType>;
    create(options?: any): Promise<ModelType>;
    update(options?: any): Promise<ModelType>;
    delete(options?: any): Promise<ModelType>;
}
