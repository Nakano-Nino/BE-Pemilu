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

    @CreateDateColumn( { type: "timestamp with time zone"} )
    createdAt: Date

    @UpdateDateColumn( { type: "timestamp with time zone"} )
    updatedAt: Date
}
