export const rootHandler = (request, response, next) => {
    response.send({
        hello: 'world',
    });
};