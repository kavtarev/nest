import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'token' })
export class TokenEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { nullable: true })
  token: string;

  @Column('text', { nullable: true })
  ip: string;

  @Column('text', { nullable: true })
  os: string;

  @Column('text', { nullable: true })
  name: string;

  @CreateDateColumn()
  createdAt: Date;
}
