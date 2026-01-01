import { get } from '../router.js';
get("/health", (_, res) => {
    res.end("OK");
});
get("/", "index.html");
get("/index", "index.html");
//# sourceMappingURL=health.js.map