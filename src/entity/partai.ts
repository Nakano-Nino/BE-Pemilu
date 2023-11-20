import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class partai {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    ketum: string

    @Column()
    vissionMission: String

    @Column()
    address: String

    @Column()
    image: String
}
