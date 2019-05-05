import * as Router from "koa-router";
import { Inject } from "typescript-ioc";

import AuthRoutes from "../routes/AuthRoutes";

export default class AppRoute {

    constructor (
        @Inject private authRoutes: AuthRoutes,
    ) {

    }

    public registerRoutes(router: Router): void {
        this.authRoutes.register(router);
    }    
}