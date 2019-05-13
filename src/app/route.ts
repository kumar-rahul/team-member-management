import * as Router from 'koa-router';
import { Inject } from 'typescript-ioc';

import AuthRoutes from '../routes/AuthRoutes';
import TeamMemberRoutes from '../routes/TeamMemberRoutes';

export default class AppRoute {

    constructor (
        @Inject private authRoutes: AuthRoutes,
        @Inject private teamMemberRoutes: TeamMemberRoutes,        
    ) {

    }

    public registerRoutes(router: Router): void {
        this.authRoutes.register(router);
        this.teamMemberRoutes.register(router);        
    }    
}