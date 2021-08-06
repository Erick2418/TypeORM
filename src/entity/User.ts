import { Entity,Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{
    
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    firstname: string;

    @Column('date')
    fecha: string;
    
    @Column()
    correo: string;
    
    @Column()
    telefono: string;
    
    @Column('double')
    sueldo: number
}

