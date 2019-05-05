import * as Koa from "koa";
import { AppConstant } from "../../app/constant";
import config from "../../config/config";

export default async (ctx: Koa.Context, next: () => Promise<any>) => {
	const jwt = require("jwt-simple");
	const token = (ctx.body && ctx.body.access_token) || (ctx.query && ctx.query.access_token) || ctx.headers["x-access-token"];
	if (token) {
		try {
			const decoded = jwt.decode(token, config.jwtsecretkey);            
			if (decoded.exp <= Date.now()) {
				ctx.throw(400, AppConstant.TOKENEXPIRED);
			}
			// Authorize the user to see if s/he can access our resources
			const dbUser = validateUser(decoded.user.username); // The key would be the logged in user's username
			if (dbUser) {
				if ((ctx.request.url.indexOf("admin") >= 0 && dbUser.role === "admin") || (ctx.request.url.indexOf("admin") < 0 && ctx.request.url.indexOf("v1/") >= 0)) {
					await next(); // To move to next middleware
				} else {
					ctx.throw(403, AppConstant.NOTAUTHORIZED);
				}
			} else {
				// // No user with this name exists, respond back with a 401
				ctx.throw(401, AppConstant.INVALIDUSER);
			}
		} catch (err) {
			ctx.throw(500, AppConstant.SOMETHINGWENTWRONG, err);
		}
	} else {
		ctx.throw(401, AppConstant.INVALIDTOKEN);
	}
};

const validateUser = (username: string) => {
	// spoofing the DB response for simplicity
	const dbUserObj = { // spoofing a userobject from the DB.
		name: "kumar rahul",
		role: "admin",
		username: "kumarrahul",
	};
	return dbUserObj;
};
