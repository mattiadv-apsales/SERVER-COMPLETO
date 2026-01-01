import { get, post } from '../router.js';
import type { JSONRequest } from '../middlewares/json.js';

get("/health", (_, res) => {
    res.end("OK");
})

get("/", "index.html");
get("/index", "index.html");
post("/data", (req: JSONRequest, res) => {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ received: req.body }));
})