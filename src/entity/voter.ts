import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, ManyToOne, OneToMany } from "typeorm"
import { user } from "./user"
import { paslon } from "./paslon"

@Entity()
export class voter {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    fullName: string

    @Column()
    address: string

    @Column()
    gender: string

    @Column()
    paslon: string

    @OneToOne(() => user)
    @JoinColumn()
    User: user
    
    @ManyToOne(() => paslon, (Paslon) => Paslon.Voter, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    })
    Paslon: paslon
}
