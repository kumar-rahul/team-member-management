import { Singleton } from "typescript-ioc";
import EntityNotFoundError from "../exceptions/EntityNotFoundError";
import TeamMember from "../models/TeamMember";
import IRepository from "../repositories/IRepository";
import { AppConstant } from "../app/constant";

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
        if (!result.length) {
            throw new EntityNotFoundError("No team member was found for ID: " + id);
        }
        return result[0];
    }

    public async findTeamMemberByEmail(email: string) {
        const result = await this.getTeamMemberRepository()
                        .createQueryBuilder("team_member")
                        .where("team_member.email = :email", { email: email })
                        .getOne();
        return result;
    }

    public async saveTeamMember(teamMember: TeamMember): Promise<TeamMember> {
        return this.getTeamMemberRepository().save(teamMember);
    }

    public async updateTeamMember(teamMember: TeamMember): Promise<TeamMember> {
        this.getTeamMemberRepository()
            .createQueryBuilder()
            .update("team_member")
            .set(teamMember)
            .where("email = :email", { email: teamMember.$email })
            .execute();
        return teamMember;
    }

    public async deleteTeamMember(id: number) {
        const result = await this.getTeamMemberRepository()
                                .createQueryBuilder()
                                .delete()
                                .from("team_member")
                                .where("id = :id", { id: id })
                                .execute();
        return result;
    }
}
