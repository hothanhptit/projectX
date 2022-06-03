import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Node } from 'src/modules/nodes';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

// @Index('username', ['username'], {})
// @Index('password', ['password'], {})
// @Entity('users', { schema: 'projectX' })
// @ObjectType({ implements: Node })
// @InputType()
@ObjectType('Users')
@InputType('UserInput')
@Entity('users')
export class Users {
  @Field()
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string

  @Column('varchar', { name: 'username' })
  @Field(() => String, { name: 'username' })
  username: string;

  @Column('varchar', { name: 'password' })
  @Field(() => String, { name: 'password' })
  password: string;

  // @Column({ default: true })
  // isActive: boolean;
}
