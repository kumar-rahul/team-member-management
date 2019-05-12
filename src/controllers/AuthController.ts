import { Context } from "koa";
import { IMiddleware, IRouterContext } from "koa-router";
import { Inject, Singleton } from "typescript-ioc";
import { AppConstant } from "../app/constant";
import AuthService from "../services/AuthService";

@Singleton
export default class AuthController {

    constructor( @Inject private authService: AuthService) { }

    public async login(ctx: IRouterContext) {
            const username = ctx.request.body.username || "";
            const password = ctx.request.body.password || "";
            if (username === "" || password === "") {
                ctx.throw(401, AppConstant.INVALIDCREDENTIAL);
            }
            // Fire a query to your DB and check if the credentials are valid
            const dbUserObj = this.authService.validate(username, password);
            if (!dbUserObj) { // If authentication fails, we send a 401 back
                ctx.throw(401, AppConstant.INVALIDCREDENTIAL);
            }
            if (dbUserObj) {
                // If authentication is success, token is generated and dispatched to the client
                ctx.body = {
                    status: "SUCCESS",
                    token: this.authService.genToken(dbUserObj),
                };
                ctx.status = 200;
            }
    }

}
