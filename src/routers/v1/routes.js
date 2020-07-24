import { rootHandler } from './handlers/rootHandler';

export default [
    {
        endpoint: '/',
        method: 'GET',
        handler: rootHandler
    }
];