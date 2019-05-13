require('dotenv').config();
import convict from 'convict';
import path  from 'path';

const config = convict({
    env: {
        doc: 'The application environment.',
        format: ['prod', 'dev', 'test'],
        default: 'dev',
        env: 'NODE_ENV',
    },
    ip: {
        doc: 'The ip address to bind.',
        format: 'ipaddress',
        default: '127.0.0.1',
        env: 'IP_ADDRESS',
    },
    port: {
        doc: 'The port to bind.',
        format: 'port',
        default: 3000,
        env: 'PORT',
    },
    jwtsecretkey: {
        doc: 'jwt secret key',
        format: String,
        default: 'secretsecret',
        sensitive: true,
    },
    db: {
        host: {
            doc: 'Database host name/IP',
            format: '*',
            default: 'localhost',
        },
        port: {
            doc: 'The database port to bind.',
            format: 'port',
            default: 3306,
        },
        teamMemberDb: {
            doc: 'Database name',
            format: String,
            default: 'teamMember',
        },
        dbUsername: {
            doc: 'username',
            format: String,
            default: '',
        },
        dbPassword: {
            doc: 'userpassword',
            format: String,
            default: '',        // password for the database
            sensitive: true,
        },
    },    
    log :  {
        level: {
            doc: "Log Levels",
            format: ["info", "warn", "debug", "error", "none"],
            default: "info"
        },
        status: {
            doc: "enabled/disabled",
            format: "Boolean",
            default: false,
        }
    }
});


const env = config.get('env');
// var filePath = path.join(__dirname, `${env}.json`)
config.loadFile(path.join(__dirname, `${env}.env.json`));

config.validate({ allowed: 'strict' });

// export default config;
export default config.getProperties();
