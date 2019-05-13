import 'reflect-metadata';
import { Container } from 'typescript-ioc';
import config from './config/config';
import app from './app/server';

// tmm: team member management
const tmmApp: app = Container.get(app);
// tmmApp.start();
tmmApp.start()
.then((serverStatus) => {
    console.log('Server Status:', serverStatus);
})
.catch((e) => {
    console.log(e);
    const msg = 'Server Status: Server failed to start on ' + config.env + ' environment at port ' + config.port;
    console.log('Database connection failed. Check database username and password.' + '\n' + msg);
});
