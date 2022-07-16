import { Column, Entity, PrimaryColumn } from "typeorm";
import { IEntity } from "./base.entity";

@Entity()
export class User implements IEntity {

    @PrimaryColumn("uuid")
    id: string;

    @Column({ length: 100 })
    name: string;

    @Column({ length: 200 })
    email: string;

    @Column({ length: 400 })
    password: string;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;
}