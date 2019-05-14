# Team Member Management

The following exposition is regarding backend workflow design. It delineates tech and design patterns together with the different folders based on separation of concern theme.
The application is written in Typescript, utilizing the KOA framework to establish application agnostic and stateless server infrastructure. It supports user authentication with JWT (jwt-simple) and communicates with a MySQL database by way of the typeorm object modeling services.
The application build is done using standard npm commands found in the package.json file.
1. Development Setup:
## Pre-reqs
To build and run this app locally you will need:
- Install [Node.js](https://nodejs.org/en/) v8.9.4


## Features:
 * [Nodemon](https://www.npmjs.com/package/nodemon) - server auto-restarts when code changes - v1.19.0
 * [Koa](https://www.npmjs.com/package/koa) - Framework for nodejs – v2.7.0
 * [TypeORM](https://www.npmjs.com/package/typeorm) - ORM - v0.2.17
 * [Class-validator](https://www.npmjs.com/package/class-validator) - Decorator based entities validation - v0.9.1
 * [Typescript](https://www.typescriptlang.org/) - Programming language – v3.4.5
 * [typescript-ioc](https://www.npmjs.com/package/typescript-ioc) - Dependency Injection container for typescript – v1.2.5
 * [Typescript](https://www.typescriptlang.org/) - Programming language – v3.4.5
 * [convict](https://www.npmjs.com/package/convict) - Configuration management library – v4.2.1
 * [dotenv](https://www.npmjs.com/package/dotenv) - Loads environment variables – v8.0.0
 * [ts-node](https://www.npmjs.com/package/ts-node) - TypeScript execution environment – v8.1.0
 * [tslint](https://www.npmjs.com/package/tslint) - v5.16.0
## Included middleware:
 * [koa-router](https://www.npmjs.com/package/koa-router) - Router middleware - v7.4.0
 * [koa-bodyparser](https://www.npmjs.com/package/koa-bodyparser) - body parser – v4.2.1
 * [Winston](https://www.npmjs.com/package/winston) - logger - v3.2.1
 * [jwt-simple](https://www.npmjs.com/package/jwt-simple) - encode and decode token during user authentication. – v0.5.6
 * [koa-helmet](https://www.npmjs.com/package/koa-helmet) - provides security header – v4.1.0
 * [@koa/cors](https://www.npmjs.com/package/@koa/cors) - v2.2.3
 
 # Getting Started
- Clone the repository
```
git clone https://github.com/kumar-rahul/team-member-management.git
```
- Install dependencies
```
cd <project_name>
npm install
```
- Run the project directly in TS (dev environment)
```
npm run start:dev
```

- Build and run the project in JS
```
npm run build
npm run start:stage
```

# Expected error while configuring project
1. Error:
ENOENT: no such file or directory, open '../team-member-management/env/dev.env.json'

* Create dev.env.json
  * file(path: /team-member-management/env/dev.env.json)
	{
	    "env": "dev",
	    "port": "4000",
	    "jwtsecretkey": "wjwnkwksd,sdjcbssdcchbwjwefwf",	// your jwt secret key
	    "db": {
	        "dbUsername": "*****", // your db user name
	        "dbPassword": "****",	//your db password
	    },
	    "log": {
	        "level": "debug",
	        "status": true
	    }
	}


* Similarly for prod -> Create prod.env.json  
(path: /team-member-management/env/prod.env.json)
* Similarly for staging -> Create staging.env.json  
(path: /team-member-management/env/staging.env.json)

2. Error:
UnhandledPromiseRejectionWarning: Error: ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client

*	[Known issue with mysql](https://dev.mysql.com/doc/refman/5.5/en/old-client.html):[Reference](https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server)
	Also check mysql username and password

3. Error:
Error: ER_BAD_DB_ERROR: Unknown database 'teammember'
* Create database locally:
CREATE SCHEMA `teammember` ;


