import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'varchar', length: 100 })
  email: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  name: string;

  @Column({ nullable: false, type: 'varchar', length: 50})
  role: string;

  @Column({ nullable: false, default: true })
  status: boolean;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  salt: string;

  @Column({ nullable: false, type: 'varchar', length: 64 })
  confirmationToken: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
