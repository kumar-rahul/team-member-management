import { Inject, Singleton } from "typescript-ioc";
import BadRequestEntity from "../exceptions/BadRequestEntity";
import EntityNotFoundError from "../exceptions/EntityNotFoundError";
import TeamMember from "../models/TeamMember";
import TeamMemberRepository from "../repositories/TeamMemberRepository";

@Singleton
export default class TeamMemberService {

    constructor( @Inject private teamMemberRepository: TeamMemberRepository) { }

    public async findById(id: number): Promise<TeamMember> {
        return this.teamMemberRepository.findTeamMemberByIds(id);
    }

    public async findAll(): Promise<TeamMember[]> {
        return this.teamMemberRepository.getAllTeamMember();
    }

    public async save(teamMember: TeamMember): Promise<TeamMember> {
        return this.teamMemberRepository.saveTeamMember(teamMember);
    }

    public async update(teamMember: TeamMember) {
        console.log('update', teamMember);
        try {
            await this.teamMemberRepository.findTeamMemberByIds(teamMember.$id);
            return this.teamMemberRepository.saveTeamMember(teamMember);
        } catch (e) {
            if (e instanceof EntityNotFoundError) {
                throw new BadRequestEntity("The given teamMember does not exist yet.");
            }
        }
    }

}
