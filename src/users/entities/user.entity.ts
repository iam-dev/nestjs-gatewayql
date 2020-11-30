import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, BeforeInsert, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { UserRole } from './user.interface';

@ObjectType()
@Entity()
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(type => String, { nullable: true })
  id: string;

  @Column({ nullable: true })
  @Field(type => String, { nullable: true })
  firstname: string;

  @Column({ nullable: true })
  @Field(type => String, { nullable: true })
  lastname: string;

  @Column({ unique: true, nullable: false })
  @Field(type => String, { nullable: true })
  username: string;

  @Column('text', {unique: true})
  @Field(type => String, { nullable: true })
  email: string;

  @Column({ select: false, nullable: false })
  @Field(type => String, { nullable: true })
  password: string;

  @Column({ nullable: true })
  @Field(type => String, { nullable: true })
  redirectUri: string

  @Column({type: 'enum', enum: UserRole, default: UserRole.USER})
  @Field(type => String, { nullable: true })
  role: UserRole;

  @CreateDateColumn({ type: "timestamp" })
  @Field(type => String, { nullable: true })
  createdAt: number;

  @UpdateDateColumn({ type: "timestamp" })
  @Field(type => String, { nullable: true })
  updatedAt: number;

  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }
}
