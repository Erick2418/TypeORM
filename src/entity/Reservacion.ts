import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Cliente } from './Cliente';


@Entity()
export class Reservacion{
    
    @PrimaryGeneratedColumn()
    id:number;
    
    @Column('date')
    fecha_entrada: string;
    
    @Column('date')
    fecha_salida: string;

    @Column('double')
    costo: number;

    @Column()
    num_habitacion: number;
    
    @ManyToOne(() => Cliente, cliente => cliente.reservacion)
    cliente: Cliente;

    
}

