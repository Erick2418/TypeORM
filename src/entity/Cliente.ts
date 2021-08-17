import { Entity,Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Reservacion } from './Reservacion';


@Entity()
export class Cliente{
    
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:"varchar", length:75})
    email: string;

    @Column({type:"varchar", length:75})
    password: string;
    
    @Column({type:"varchar", length:50})
    name: string;

    @Column('date')
    fecha_nacimiento: string;
    
    @Column({type:"varchar", length:12})
    cedula: string;

    @Column({type:"varchar", length:12})
    cellphone: string;
    
    @OneToMany(() => Reservacion, reservacion => reservacion.cliente)
    reservacion: Reservacion[];



}

