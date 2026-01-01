import { use } from "../middleware.js";
const logger = (req, res, next) => {
    const now = new Date().toISOString();
    console.log(`[${now}] ${req.method} ${req.url}`);
    next();
};
use(logger);
//# sourceMappingURL=logger.js.map