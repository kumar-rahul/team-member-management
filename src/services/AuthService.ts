import { Inject, Singleton } from "typescript-ioc";

import config from "../config/config";
// import BadRequestEntity from "../exceptions/BadRequestEntity";
// import EntityNotFoundError from "../exceptions/EntityNotFoundError";
// import Auth from "../models/Auth";


@Singleton
export default class AuthService {

    public validate(username: string, password: string) {
        // spoofing the DB response for simplicity
        const dbUserObj = { // spoofing a userobject from the DB.
            name: "kumar rahul",
            role: "admin",
            username: "kumarrahul",
        };
        return dbUserObj;
    }

    public genToken(userData: {}) {
        const jwt = require("jwt-simple");
        const tokenExpiry = this.expiresIn(7); // 7 days
        const payload = {
            exp: tokenExpiry,
            user: userData,
        };
        const secret = config.jwtsecretkey;
        const jwtToken = jwt.encode(payload, secret);

        return jwtToken;
    }

    private expiresIn(numDays: number) {
        const dateObj = new Date();
        return dateObj.setDate(dateObj.getDate() + numDays);
    }

}
