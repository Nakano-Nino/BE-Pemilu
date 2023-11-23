import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, ManyToOne, OneToMany } from "typeorm"
import { user } from "./user"
import { paslon } from "./paslon"

@Entity()
export class voter {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    userId: number
    @OneToOne(() => user)
    @JoinColumn()
    User: user
    
    @Column()
    paslonId: number
    @ManyToOne(() => paslon, (Paslon) => Paslon.Voter, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    })
    Paslon: paslon
}
