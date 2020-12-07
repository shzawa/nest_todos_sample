import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

export enum CATEGORY {
  SCHOOL = 'school',
  OFFICE = 'office',
  GENERAL = 'general',
}

@Entity({
  name: 'todos',
})
export class Todo extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id!: number;

  @Column({
    nullable: false,
    type: 'text',
  })
  @ApiProperty()
  title!: string;

  @Column({
    type: 'enum',
    enum: CATEGORY,
  })
  @ApiProperty()
  category!: CATEGORY;

  @Column({
    nullable: false,
  })
  @ApiProperty()
  userId!: number;

  @ManyToOne(
    () => User,
    user => user.todos,
  )
  @JoinColumn({
    name: 'userId',
  })
  user: User;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  @ApiProperty()
  createdAt!: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  @ApiProperty()
  updatedAt!: Date;
}
