import http from 'http';
import { router } from './router.js';
import './routes/health.js';
import './middlewares/logger.js';
import './middlewares/json.js';
import { staticMiddleware } from './middlewares/static.js';
staticMiddleware('public');
const server = http.createServer((req, res) => {
    router(req, res);
});
server.listen(3000, () => {
    console.log('Server listening on port http://localhost:3000');
});
//# sourceMappingURL=server.js.map