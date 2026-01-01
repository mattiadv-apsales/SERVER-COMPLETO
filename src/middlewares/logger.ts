import { use } from "../middleware.js";
import type { Middleware } from "../middleware.js";

const logger: Middleware = (req, res, next) => {
    const now = new Date().toISOString();
    console.log(`[${now}] ${req.method} ${req.url}`);
    next();
}

use(logger);