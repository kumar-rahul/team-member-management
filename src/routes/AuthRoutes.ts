import { IMiddleware, IRouterContext } from "koa-router";
import { Container, Inject } from "typescript-ioc";
import { AppConstant } from "../app/constant";
import AuthController from "../controllers/AuthController";
import Route from "../models/Route";
import IRoutes from "./IRoutes";

export default class AuthRoutes extends IRoutes {

    constructor( @Inject private authController: AuthController) {
        super();
    }

    protected getRoutes(): Route[] {
        return [
            Route.newRoute(AppConstant.AUTH, "post", (ctx: IRouterContext) => this.authController.login(ctx)),
        ];
    }

}
