import { Context } from "koa";
import { IMiddleware, IRouterContext } from "koa-router";
import { Inject, Singleton } from "typescript-ioc";
import TeamMember from "../models/TeamMember";
import TeamMemberService from "../services/TeamMemberService";

@Singleton
export default class TeamMemberController {

    constructor( @Inject private teamMemberService: TeamMemberService) { }

    public async getAllMember(ctx: IRouterContext) {
        ctx.body = await this.teamMemberService.findAll();
    }

    public async removeMember(ctx: IRouterContext) {
        try {
            ctx.body = await this.teamMemberService.findById(ctx.params.id);
        } catch (e) {
            ctx.throw(404);
        }
    }

    public async saveMember(ctx: IRouterContext) {
        try {
            const teamMember: TeamMember = TeamMember.newTeamMember(ctx.request.body);
            const result = await this.teamMemberService.save(teamMember);
            ctx.body = result;
        } catch (e) {
            ctx.throw(400, e.message);
        }
    }

    public async editMember(ctx: IRouterContext) {
        try {
            const teamMember: TeamMember = TeamMember.newTeamMember(ctx.request.body);
            if (String(ctx.params.id) !== String(teamMember.$id)) {
                ctx.throw(400);
            }
            const result = await this.teamMemberService.update(teamMember);
        } catch (e) {
            ctx.throw(400, e.message);
        }
    }
}
