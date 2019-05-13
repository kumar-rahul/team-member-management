import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import helmet from 'koa-helmet';
import Router from 'koa-router';
import { Inject } from 'typescript-ioc';
import { createConnections } from 'typeorm';
import AppRoute from './route';
import ValidateRequest from '../middleware/security/ValidateRequest';
import config from '../config/config';
import * as dbConnection from './dbConnection';
import cors from '@koa/cors';
import * as winston from 'winston';
import { logger } from '../logging';

export default class App {
    constructor(
        @Inject private appRoute: AppRoute,
    ) {}
    
    private async createApp() {
        await createConnections(dbConnection.connections);
        const app: Koa = new Koa();
        const router: Router = new Router();
        app.use(async (ctx, next) => {
            try {
                await next();
            } catch (err) {
                ctx.status = err.statusCode || err.status || 500;
                ctx.body = {
                status: 'FAILURE',
                error: err
                };
            }
        });
        app.use(async (ctx, next) => {
            ctx.set('Access-Control-Allow-Origin', '*');
            ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
            await next();
        });
        app.use(helmet());
        app.use(cors());
        app.use(logger(winston));
        app.use(router.allowedMethods());
        router.all('/v1/*', ValidateRequest);
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
        const msg = 'Started listening on ' + config.env + ' environment at port ' + config.port + '...';
        return Promise.resolve(msg);
    }

}