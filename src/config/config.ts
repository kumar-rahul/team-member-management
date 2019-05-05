require('dotenv').config();
import convict from "convict";
import path  from 'path';

const config = convict({
    env: {
        doc: "The application environment.",
        format: ["prod", "dev", "test"],
        default: "dev",
        env: "NODE_ENV",
    },
    ip: {
        doc: "The ip address to bind.",
        format: "ipaddress",
        default: "127.0.0.1",
        env: "IP_ADDRESS",
    },
    port: {
        doc: "The port to bind.",
        format: "port",
        default: 3000,
        env: "PORT",
    },
    jwtsecretkey: {
        doc: "jwt secret key",
        format: String,
        default: "secretsecret",
        sensitive: true,
    }
});


const env = config.get('env');
// var filePath = path.join(__dirname, `${env}.json`)
config.loadFile(path.join(__dirname, `${env}.env.json`));

config.validate({ allowed: "strict" });

// export default config;
export default config.getProperties();
