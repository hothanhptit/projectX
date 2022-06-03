import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user', { schema: 'projectx' })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Field()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column({ default: true })
  isActive: boolean;
}
