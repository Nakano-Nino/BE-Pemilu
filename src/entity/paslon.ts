import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne } from "typeorm"
import { partai } from "./partai"
import { voter } from "./voter"

@Entity()
export class paslon {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    orderNum: number

    @Column()
    VissionMission: string

    @Column()
    image: String

    @OneToMany(() => partai, (Partai) => Partai.Paslon, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    })
    Partai: partai[]

    @OneToMany(() => voter, (Voter) => Voter.Paslon, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    })
    Voter: voter[]
}
