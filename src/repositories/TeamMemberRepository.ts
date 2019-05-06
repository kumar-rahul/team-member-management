import { Singleton } from "typescript-ioc";
import EntityNotFoundError from "../exceptions/EntityNotFoundError";
import TeamMember from "../models/TeamMember";
import IRepository from "../repositories/IRepository";

@Singleton
export default class TeamMemberRepository extends IRepository {

    constructor() {
        super();
    }

    public async getAllTeamMember(): Promise<TeamMember[]> {
        return this.getTeamMemberRepository().find();
    }

    public async findTeamMemberByIds(id: number): Promise<TeamMember> {
        const result = await this.getTeamMemberRepository().findByIds([id]);
        console.log('findTeamMemberByIds | result::', result[0]);
        if (!result.length) {
            throw new EntityNotFoundError("No team member was found for ID: " + id);
        }
        return result[0];
    }

    public async saveTeamMember(teamMember: TeamMember): Promise<TeamMember> {
        return this.getTeamMemberRepository().save(teamMember);
    }
}
