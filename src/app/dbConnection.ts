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
};
export const connections = [teamMember];