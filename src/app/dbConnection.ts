import config from '../config/config';

const teamMember: any = {
    name: 'teamMember',
    type: 'mysql',
    host: config.db.host,
    port: config.db.port,
    username: config.db.dbUsername,
    password: config.db.dbPassword,
    database: config.db.teamMemberDb,
    entities: ['src/models/**/*.ts'],
    synchronize: true, // check behavior
    logging: 'all',
    'cli': {
        'entitiesDir': 'src/models',
     }
};

const teamMemberStaging: any = {
    name: 'teamMember',
    type: 'mysql',
    host: config.db.host,
    port: config.db.port,
    username: config.db.dbUsername,
    password: config.db.dbPassword,
    database: config.db.teamMemberDb,
    entities: ['build/models/**/*.js'],
    synchronize: true, // check behavior
    logging: 'all',
    'cli': {
        'entitiesDir': 'src/models',
     }
};
const env = config.env;
let dbConnections = [teamMember];

if (env === 'staging' || env === 'prod') {
    dbConnections = [teamMemberStaging];
}
export const connections = dbConnections;
