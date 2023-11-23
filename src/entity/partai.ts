import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm"
import { paslon } from "./paslon"

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

    @ManyToOne(() => paslon, (Paslon) => Paslon.Partai, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    })
    Paslon: paslon
}
