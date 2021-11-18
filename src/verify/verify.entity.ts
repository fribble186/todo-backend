import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Verify {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  code: string;
}
