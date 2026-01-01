import http from 'http';
import { router } from './router.js';
import './routes/health.js';
import './middlewares/logger.js';
import './middlewares/json.js';
import { staticMiddleware } from './middlewares/static.js';
import { get, post } from './router.js';
staticMiddleware('public');
get("/", "index.html");
get("/index", "index.html");
post("/data", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ received: req.body }));
});
const server = http.createServer((req, res) => {
    router(req, res);
});
server.listen(3000, () => {
    console.log('Server listening on port http://localhost:3000');
});
//# sourceMappingURL=server.js.map