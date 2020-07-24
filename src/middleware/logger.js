import winston from 'winston';
import expressWinston from 'express-winston';

export const devLogger = (httpLogger) => {
    return expressWinston.logger({
        transports: [
            new winston.transports.Console(),
        ],
        statusLevels: {
            200: 'info',
            201: 'info',
            202: 'info',
            204: 'info',
            400: 'warn',
            401: 'warn',
            402: 'warn',
            403: 'warn',
            404: 'warn',
            409: 'warn',
            500: 'error'
        },
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp(),
            winston.format.json(),
            winston.format.prettyPrint(),
        ),
    });
};

export const prodLogger = (httpLogger) => {
    return expressWinston.logger({
        transports: [
            new winston.transports.Console({
                format: winston.format.combine(
                    winston.format.colorize(),
                    winston.format.timestamp(),
                    winston.format.cli(),
                )
            }),
            // only info log level
            new winston.transports.File({
                filename: 'access.log',
                level: 'info',
                format: winston.format.combine(
                    winston.format.timestamp(),
                    winston.format.metadata(),
                ),
            }),
            // only error log level
            new winston.transports.File({
                filename: 'error.log',
                level: 'error',
                format: winston.format.combine(
                    winston.format.timestamp(),
                    winston.format.metadata(),
                ),
            }),
            // all log levels
            new winston.transports.File({
                filename: 'combined.log',
                format: winston.format.combine(
                    winston.format.timestamp(),
                    winston.format.metadata(),
                ),
            }),
        ],
        statusLevels: {
            200: 'info',
            201: 'info',
            202: 'info',
            204: 'info',
            400: 'warn',
            401: 'warn',
            402: 'warn',
            403: 'warn',
            404: 'warn',
            409: 'warn',
            500: 'error'
        },
    });
};