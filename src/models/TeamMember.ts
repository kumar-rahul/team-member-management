import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail, IsIn } from 'class-validator';

@Entity('team_member')
export default class TeamMember {

    @PrimaryGeneratedColumn()
    private id!: number;
    @Column()
    private firstName!: string;
    @Column()
    private lastName!: string;
    @Column()
    private phoneNumber!: string;
    @Column()
    @IsEmail()
    private email!: string;
    @Column()
    @IsIn(['admin', 'regular'])
    private role!: string;

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

    public get $phoneNumber(): string {
        return this.phoneNumber;
    }

    public set $phoneNumber(value: string) {
        this.phoneNumber = value;
    }

    public get $email(): string {
        return this.email;
    }

    public set $email(value: string) {
        this.email = value;
    }

    public get $role(): string {
        return this.role;
    }

    public set $role(value: string) {
        this.role = value;
    }

    public static newTeamMember(obj: { id?: number, firstName?: string, lastName?: string, phoneNumber?: string, email?: string, role?: string}) {
        const newTeamMember = new TeamMember();
        if (obj.id) newTeamMember.id = obj.id;
        if (obj.firstName) newTeamMember.firstName = obj.firstName;
        if (obj.lastName) newTeamMember.lastName = obj.lastName;
        if (obj.phoneNumber) newTeamMember.phoneNumber = obj.phoneNumber;
        if (obj.email) newTeamMember.email = obj.email;
        if (obj.role) newTeamMember.role = obj.role;

        return newTeamMember;
    }

}
