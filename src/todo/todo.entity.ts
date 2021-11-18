import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column('text', {
    nullable: true,
  })
  data: string;

  @Column({
    nullable: true,
  })
  isShare: boolean;
}
