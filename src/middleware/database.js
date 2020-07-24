export const registerDatabase = (app, database, request, response, next) => {
    app.factory('database', (request, response, next) => {
        next(null, {
            database,
        });
    });
};