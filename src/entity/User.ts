import { Column, Entity } from "typeorm";

@Entity({
    name: "users"
})
export class User {
    @Column({primary: true, type: "uuid", generated: "uuid"})
    id: string;
    @Column({type: "varchar", length: 255})
    name: string;
    @Column({type: "varchar", length: 255})
    email: string;
    @Column({type: "varchar", length: 255})
    password: string;
}