export const haltOnTimedout = (request, response, next) => {
    if (!request.timedout) next();
}