import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { IEntity } from "../database/entities/base.entity";

export type TEntityConstructor<T extends IEntity> = new () => T;

@Injectable()
export class BaseRepositoryFactory {

    constructor (private readonly _dataSource: DataSource) {
    }

    public create<T extends IEntity>(entity: TEntityConstructor<T>): BaseRepository<T> {

        return new BaseRepository<T>(this._dataSource, entity);
    }
}

export class BaseRepository<TEntity extends IEntity> {

    private readonly _repository: Repository<TEntity>;

    constructor(dataSource: DataSource, entityConstructor: new () => TEntity) {

        this._repository = dataSource.getRepository(entityConstructor);
    }

    public save(entity: TEntity): Promise<TEntity> {

        return this._repository.save(entity);
    }

    public findById(id: IEntity["id"]): Promise<TEntity> {

        return this._repository.findOneBy({ id: id } as any);
    }

    public findBy(where: Partial<TEntity>): Promise<TEntity[]> {

        return this._repository.findBy(where as any);
    }
}