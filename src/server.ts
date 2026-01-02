import http from 'http';
import fs from 'node:fs';
import path from 'node:path';
import { router } from './router.js';
import './middlewares/sessions.js';
import './routes/health.js';
import './middlewares/logger.js';
import './middlewares/json.js';
import { staticMiddleware } from './middlewares/static.js';
import { get, post } from './router.js';
import type { JSONRequest } from './middlewares/json.js';
import type { SessionRequest } from './middlewares/sessions.js';
import { runMiddleware } from './middleware.js';

staticMiddleware('public');

get("/", (req: SessionRequest, res) => {
    runMiddleware(req, res, () => {
        if (!req.session.views) req.session.views = 0;
        req.session.views++;
        console.log("VIEWS: ", req.session.views);

        const filePath = path.join(process.cwd(), 'public', 'index.html');
        fs.readFile(filePath, "utf-8", (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end("Internal Server Error");
                return;
            }
            const html = data.replace("{{ views }}", `<p>Views this session: ${req.session.views}</p>`);
            res.setHeader("Content-Type", "text/html; charset=utf-8");
            res.end(html);
        })
    })
})

get("/index", (req: SessionRequest, res) => {
    runMiddleware(req, res, () => {
        if (!req.session.views) req.session.views = 0;
        req.session.views++;
        console.log("VIEWS: ", req.session.views);

        const filePath = path.join(process.cwd(), 'public', 'index.html');
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end("Internal Server Error");
                return;
            }

            const html = data.replace("{{ views }}", `<p>Views this session: ${req.session.views}</p>`);
            res.setHeader("Content-Type", "text/html; charset=utf-8");
            res.end(html);
        })
    })
})

post("/data", (req: JSONRequest, res) => {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ received: req.body }));
})

const server = http.createServer((req, res) => {
    router(req, res);
})

server.listen(3000, () => {
    console.log('Server listening on port http://localhost:3000');
})