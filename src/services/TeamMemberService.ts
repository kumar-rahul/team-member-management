import { Inject, Singleton } from "typescript-ioc";
import BadRequestEntity from "../exceptions/BadRequestEntity";
import EntityNotFoundError from "../exceptions/EntityNotFoundError";
import TeamMember from "../models/TeamMember";
import TeamMemberRepository from "../repositories/TeamMemberRepository";
import { AppConstant } from "../app/constant";

@Singleton
export default class TeamMemberService {

    constructor( @Inject private teamMemberRepository: TeamMemberRepository) { }

    public async findById(id: number): Promise<TeamMember> {
        return this.teamMemberRepository.findTeamMemberByIds(id);
    }

    // public async findByEmail(email: string): Promise<TeamMember> {
    //     return this.teamMemberRepository.findTeamMemberByEmail(email);
    // }

    public async findAll(): Promise<TeamMember[]> {
        return this.teamMemberRepository.getAllTeamMember();
    }

    // public async save(teamMember: TeamMember): Promise<TeamMember> {
    public async save(teamMember: TeamMember) {        
        try {
            const member = await this.teamMemberRepository.findTeamMemberByEmail(teamMember.$email);
            if (member) {
                throw new EntityNotFoundError(AppConstant.MEMBERALREADYEXIST);
            }
            return this.teamMemberRepository.saveTeamMember(teamMember);
        } catch (e) {
            throw new BadRequestEntity(e.message);
        }
    }

    public async update(teamMember: TeamMember) {
        try {
            // await this.teamMemberRepository.findTeamMemberByIds(teamMember.$id);
            const member = await this.teamMemberRepository.findTeamMemberByEmail(teamMember.$email);
            if (!member) {
                throw new EntityNotFoundError(AppConstant.MEMBERNOTFOUND);
            }
            return this.teamMemberRepository.updateTeamMember(teamMember);
        } catch (e) {
            throw new BadRequestEntity(e.message);
        }
    }

    public async removeMemberById(id: number) {
        try {
            await this.teamMemberRepository.findTeamMemberByIds(id);
            return this.teamMemberRepository.deleteTeamMember(id);
        } catch (e) {
            throw new BadRequestEntity(e.message);
        }
    }

}
