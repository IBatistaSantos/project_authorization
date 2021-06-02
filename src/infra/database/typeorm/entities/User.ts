import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Permission } from "./Permission";
import { Role } from "./Role";

@Entity("users")
class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @ManyToMany(() => Role)
  @JoinTable({
    name: "user_role",
    joinColumns: [{ name: "user_id" }],
    inverseJoinColumns: [{ name: "role_id" }],
  })
  roles: Role[];

  @ManyToMany(() => Permission)
  @JoinTable({
    name: "user_permission",
    joinColumns: [{ name: "user_id" }],
    inverseJoinColumns: [{ name: "permission_id" }],
  })
  permissions: Permission[];
}

export { User };
