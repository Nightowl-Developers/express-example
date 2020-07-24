export const registerRoutes = (router, routes) => {
    routes.forEach((route) => {
        if (route.method === 'GET') {
            console.log(`registered: ${route.endpoint}`);
            router.get(route.endpoint, route.handler);
        }
    });

    routes.forEach((route) => {
        if (route.method === 'POST') {
            router.post(route.endpoint, route.handler);
        }
    });

    routes.forEach((route) => {
        if (route.method === 'PUT') {
            router.put(route.endpoint, route.handler);
        }
    });

    routes.forEach((route) => {
        if (route.method === 'DELETE') {
            router.delete(route.endpoint, route.handler);
        }
    });
};