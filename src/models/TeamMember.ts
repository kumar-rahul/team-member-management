import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('team_member')
export default class TeamMember {

    @PrimaryGeneratedColumn()
    private id!: number;
    @Column()
    private firstName!: string;
    @Column()
    private lastName!: string;

    public get $id(): number {
        return this.id;
    }

    public set $id(value: number) {
        this.id = value;
    }

    public get $firstName(): string {
        return this.firstName;
    }

    public set $firstName(value: string) {
        this.firstName = value;
    }

    public get $lastName(): string {
        return this.lastName;
    }

    public set $lastName(value: string) {
        this.lastName = value;
    }

    public static newTeamMember(obj: { id?: number, firstName?: string, lastName?: string}) {
        const newTeamMember = new TeamMember();
        if (obj.id) newTeamMember.id = obj.id;
        if (obj.firstName) newTeamMember.firstName = obj.firstName;
        if (obj.lastName) newTeamMember.lastName = obj.lastName;

        return newTeamMember;
    }

}
