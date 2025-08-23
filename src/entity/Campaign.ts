import { Column, Entity, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity({
    name: "campaigns"
})
export class Campaign {
    @Column({ primary: true, type: "uuid", generated: "uuid"})
    id: string;

    @Column({ type: "varchar", length: 255 })
    title: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: "masterId" })
    master: User;
}