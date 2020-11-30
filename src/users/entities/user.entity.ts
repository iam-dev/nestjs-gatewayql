import { ObjectType, Field } from '@nestjs/graphql';
import { isEmail } from 'class-validator';
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, BeforeInsert, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@ObjectType()
@Entity()
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  firstname: string;

  @Column()
  @Field()
  lastname: string;

  @Column({ unique: true })
  @Field()
  username: string;

  @Column('text', {unique: true})
  @Field()
  email: string;

  @Column({select: false})
  @Field()
  password: string;

  @Column()
  @Field()
  redirectUri: string

  @CreateDateColumn({ type: "timestamp" })
  createdAt: number;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: number;

  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }
}
