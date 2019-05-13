import { IRouterContext } from 'koa-router';
import { Inject } from 'typescript-ioc';
import { AppConstant } from '../app/constant';
import TeamMemberController from '../controllers/TeamMemberController';
import Route from '../models/Route';
import IRoutes from './IRoutes';

export default class TeamMemberRoutes extends IRoutes {

    constructor( @Inject private teamMemberController: TeamMemberController) {
        super();
    }

    protected getRoutes(): Route[] {
        return [
            Route.newRoute(AppConstant.ADDTEAMMEMBER, 'post', (ctx: IRouterContext) => this.teamMemberController.saveMember(ctx)),
            Route.newRoute(AppConstant.EDITTEAMMEMBER, 'put', (ctx: IRouterContext) => this.teamMemberController.editMember(ctx)),
            Route.newRoute(AppConstant.LISTTEAMMEMBER, 'get', (ctx: IRouterContext) => this.teamMemberController.getAllMember(ctx)),
            Route.newRoute(AppConstant.DELETETEAMMEMBER, 'delete', (ctx: IRouterContext) => this.teamMemberController.removeMember(ctx)),
        ];
    }

}
