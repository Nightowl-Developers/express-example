import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import timeout from 'connect-timeout';
import compression from 'compression';
import bodyParser from 'body-parser';

import v1 from './routers/v1';
import { haltOnTimedout } from './utils/timeout';
import {
    devLogger,
    prodLogger,
    registerDatabase,
    registerApis,
} from './middleware';

/**
 * Starts the API server.
 * 
 * @param {string} port - the port the server starts on.
 * @param {object} corsOptions - the cors options object.
 * @param {context} context - the context object for passing in useful things.
 * @param {number} timeoutMs - the request timeout time in ms.
 */
const startServer = (
    port,
    corsOptions,
    context = {},
    timeoutMs = 5000,
) => {
    const app = express();

    if (context.apis) {
        app.use((request, response, next) => {
            registerApis(app, context.apis, request, response, next);
        });
    }

    if (context.database) {
        registerDatabase(context.database);
    }

    // security middleware
    app.use(helmet());

    // cors middleware
    app.use(cors({
        // cors options
        origin: corsOptions.origin,
        optionsSuccessStatus: corsOptions.optionsSuccessStatus,
    }));

    // compress
    app.use(compression());

    // if dev use devLogger
    // if prod use prodLogger
    process.env.NODE_ENV === 'development'
        ? app.use(devLogger())
        : app.use(prodLogger());

    // add timeout to requests
    app.use(timeout(timeoutMs));

    // add body parser
    app.use(bodyParser.urlencoded({
        extended: false
    }));

    // gg go next
    app.use(haltOnTimedout);

    // gg go next
    app.use(haltOnTimedout);

    // use the v1 router
    app.use('/v1', v1);

    // listen on port
    app.listen(port, () => {
        console.log(`Server started on port ${port}.`);
    });
};

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
};

const context = {
    apis: [{
        name: 'one',
        dosomething: 'do someting',
    }],
};

startServer(
    '5000',
    corsOptions,
    context,
);