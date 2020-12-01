import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, BeforeInsert, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@ObjectType()
@Entity('credentials')
export class CredentialEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id?: string;

  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField?: number;

  @CreateDateColumn({ type: "timestamp" })
  @Field()
  createdAt?: number;

  @UpdateDateColumn({ type: "timestamp" })
  @Field()
  updatedAt?: number;
}
