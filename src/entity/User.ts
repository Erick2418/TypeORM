import { Entity,Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Instituto } from './Instituto';

@Entity()
export class User{
    
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:"varchar", length:50})
    firstname: string;

    @Column('date')
    fecha: string;
    
    @Column({type:"varchar", length:75})
    correo: string;
    
    @Column({type:"varchar", length:12})
    telefono: string;
    
    @Column('double')
    sueldo: number;

    @OneToMany( ()=>Instituto, instituto=>instituto.user)
    instituto: Instituto[] 
}

