import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('text', { nullable: true })
  name: string;

  @Column('text', { nullable: true })
  password: string;

  @Column('text', { nullable: true })
  email: string;
}
