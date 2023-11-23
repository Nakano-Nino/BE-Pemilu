import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne } from "typeorm"
import { user } from "./user"

@Entity()
export class artikel {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    articleName: string

    @Column()
    description: string

    @Column()
    image: String

    @Column()
    author: String

    @Column()
    createdAt: Date

    @ManyToOne(() => user, (User) => User.article, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })
    User: user
}
