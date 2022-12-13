import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: number

    @Column({type: 'varchar'})
    name: string

    @Column({type:'varchar'})
    lastName: string
    
    @Column({type: 'boolean'})
    isSocialName: boolean

    @Column({type: 'varchar', unique: true})
    email: string

    @Column({type: 'varchar'})
    password: string

    @Column({type: 'int'})
    age: number

    @Column({type: 'boolean'})
    ageNotInform: boolean
} 