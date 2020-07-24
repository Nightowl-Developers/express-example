export const registerApis = (app, apis, request, response, next) => {
    // register all apis
    apis.forEach(api => {
        app[api.name] = api;
    });
};