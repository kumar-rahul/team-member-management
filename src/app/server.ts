import Koa from "koa";
import bodyParser from "koa-bodyparser";
import Router from "koa-router";
import { Inject } from "typescript-ioc";
import {createConnections} from "typeorm";
import AppRoute from "./route";
import ValidateRequest from "../middleware/security/ValidateRequest";
import config from "../config/config";
import * as dbConnection from "./dbconnection";

export default class App {
    constructor(
        @Inject private appRoute: AppRoute,
    ) {}
    
    private async createApp() {
        await createConnections(dbConnection.connections)
        const app: Koa = new Koa();
        const router: Router = new Router();
        // app.use(cors());
        app.use(router.allowedMethods());
        router.all("/v1/*", ValidateRequest);
        // register router
        this.appRoute.registerRoutes(router);
        // add middleware function to this application
        app.use(bodyParser());
        app.use(router.routes());

        return Promise.resolve(app);
    }

    public async start() {
        const app = await this.createApp();
        app.listen(config.port);                
        var msg = 'Started listening on ' + config.env + ' environment at port '+ config.port + '...';
        return Promise.resolve(msg);
    }

}