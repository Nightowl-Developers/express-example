import { Router } from 'express';
import routes from './routes';
import { registerRoutes } from '../../utils/routing';

const router = Router();

registerRoutes(router, routes);

export default router;