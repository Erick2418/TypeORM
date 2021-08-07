import { Entity,Column, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Auth{
    
    @PrimaryGeneratedColumn()
    id:number;
    
    @Column({type:"varchar", length:75})
    email: string;
    
    @Column({type:"varchar", length:12})
    password: string;
    
}

