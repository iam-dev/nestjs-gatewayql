import { ObjectType, Field } from '@nestjs/graphql';
import { isEmail } from 'class-validator';
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, BeforeInsert, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { UserRole } from './user.interface';

@ObjectType()
@Entity()
export class UserEntity extends BaseEntity {
  constructor(firstname?: string, lastname?: string, redirectUri?: string){
    super();
    this.firstname = firstname || '';
    this.lastname = lastname || '';
    this.redirectUri = redirectUri || '';
  }

  @PrimaryGeneratedColumn('uuid')
  @Field()
  id?: string;

  @Column({ nullable: true })
  @Field()
  firstname?: string;

  @Column({ nullable: true })
  @Field()
  lastname?: string;

  @Column({ unique: true, nullable: false })
  @Field()
  username?: string;

  @Column('text', {unique: true})
  @Field()
  email: string;

  @Column({ select: false, nullable: false })
  @Field()
  password: string;

  @Column({ nullable: true })
  @Field()
  redirectUri?: string

  @Column({type: 'enum', enum: UserRole, default: UserRole.USER})
  @Field()
  role?: UserRole;

  @CreateDateColumn({ type: "timestamp" })
  @Field()
  createdAt?: number;

  @UpdateDateColumn({ type: "timestamp" })
  @Field()
  updatedAt: number;

  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }
}
