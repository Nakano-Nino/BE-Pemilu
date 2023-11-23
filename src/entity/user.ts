import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, OneToOne } from "typeorm"
import { artikel } from "./article"
import { voter } from "./voter"

@Entity()
export class user {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    fullName: string

    @Column()
    address: string

    @Column()
    gender: string

    @Column()
    username: String

    @Column()
    password: string

    @OneToMany(() => artikel, (article) => article.User, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    })
    article: artikel[]
}
