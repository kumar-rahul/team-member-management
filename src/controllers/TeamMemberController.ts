import { Context } from 'koa';
import { IMiddleware, IRouterContext } from 'koa-router';
import { Inject, Singleton } from 'typescript-ioc';
import TeamMember from '../models/TeamMember';
import TeamMemberService from '../services/TeamMemberService';
import { isEmpty } from '../commons/utils';
import { AppConstant } from '../app/constant';
import { validate, ValidationError } from 'class-validator';

@Singleton
export default class TeamMemberController {

    constructor( @Inject private teamMemberService: TeamMemberService) { }

    public async getAllMember(ctx: IRouterContext) {
        const memberList = await this.teamMemberService.findAll();
        ctx.body = {
            status: 'SUCCESS',
            memberList,
        };
        ctx.status = 200;
    }

    public async removeMember(ctx: IRouterContext) {
        try {
            await this.teamMemberService.removeMemberById(ctx.request.body.id);
            ctx.body = {
                status: 'SUCCESS',
                member: {},
            };
            ctx.status = 200;            
        } catch (e) {
            ctx.throw(404, e.message);
        }
    }

    public async saveMember(ctx: IRouterContext) {
        try {
            const teamMember: TeamMember = TeamMember.newTeamMember(ctx.request.body);
            if (isEmpty(teamMember.$email)) {
                ctx.throw(422, AppConstant.EMAILREQUIRED);
            }
            // validate user entity
            const errors: ValidationError[] = await validate(teamMember); // errors is an array of validation errors
            if (errors.length > 0) {
                // return BAD REQUEST status code and errors array
                ctx.throw(400, errors[0].constraints.isEmail || errors[0].constraints.isIn);
                // ctx.status = 400;
                // ctx.body = errors;
            } else {
                // save the user contained in the POST body
                const result = await this.teamMemberService.save(teamMember);
                ctx.body = {
                    status: 'SUCCESS',
                    member: result,
                };
                ctx.status = 201;            
            }
        } catch (e) {
            ctx.throw(400, e.message);
        }
    }

    public async editMember(ctx: IRouterContext) {
        try {
            const teamMember: TeamMember = TeamMember.newTeamMember(ctx.request.body);
            if (isEmpty(teamMember.$email)) {
                ctx.throw(422, AppConstant.EMAILREQUIRED);
            }
            // validate user entity
            const errors: ValidationError[] = await validate(teamMember); // errors is an array of validation errors
            if (errors.length > 0) {
                ctx.throw(400, errors[0].constraints.isEmail || errors[0].constraints.isIn);
            } else {
                const result = await this.teamMemberService.update(teamMember);
                ctx.body = {
                    status: 'SUCCESS',
                    member: result,
                };
                ctx.status = 200;
            }            
        } catch (e) {
            ctx.throw(400, e.message);
        }
    }
}
