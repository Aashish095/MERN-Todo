import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  Unique,
} from "typeorm";
import { IsEmail, IsPhoneNumber, Length } from "class-validator";

@Entity()
@Unique(["email", "phone"])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(1, 255)
  name: string;

  @Column()
  @IsEmail()
  @Length(1, 255)
  email: string;

  @Column()
  @IsPhoneNumber(undefined, { message: "Invalid phone number" })
  phone: string;
}
