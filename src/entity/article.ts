import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"

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
}
