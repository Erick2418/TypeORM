import { Entity,Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from './User';

@Entity()
export class Instituto{
    
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:"varchar", length:50})
    name: string;
    @Column({type:"varchar", length:12})
    telefono: string;
    
    @Column('double')
    sueldo: number

    @ManyToOne( ()=> User,user=>user.instituto )
    user: User;
    
}

