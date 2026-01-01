import { get, post } from '../router.js';
get("/health", (_, res) => {
    res.end("OK");
});
get("/", "index.html");
get("/index", "index.html");
post("/data", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ received: req.body }));
});
//# sourceMappingURL=health.js.map