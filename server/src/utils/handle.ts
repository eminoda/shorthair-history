const mongoose = require('mongoose');
import ConfigLoader from '../utils/loader/configLoader';
import { AppKoa } from '../interfaces/appKoa';
export const handle = {
    getAppConfig: (app: AppKoa): void => {
        let config = new ConfigLoader().loadConfig();
        app.context.db = config.mongo;
    },
    connectDB: (app: AppKoa): void => {
        try {
            mongoose.set('debug', true)
            mongoose.connect(app.context.db.uri, {
                // https://mongoosejs.com/docs/connections.html#options
                useNewUrlParser: true,
                user: app.context.db.user,
                pass: app.context.db.pass
            });
        } catch (err) {
            console.log(err);
        }
    }
}