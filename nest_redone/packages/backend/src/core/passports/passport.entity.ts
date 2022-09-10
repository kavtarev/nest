import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('passport')
export class PassportEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  data: string;
}
