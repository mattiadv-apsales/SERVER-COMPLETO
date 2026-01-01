import { IncomingMessage, ServerResponse } from 'http';
import { use } from '../middleware.js';
export const jsonMiddleware = (req, res, next) => {
    if (req.method !== "POST" && req.method !== "PUT" && req.method !== "PATCH") {
        return next();
    }
    let data = '';
    req.on("data", (chunk) => {
        data += chunk.toString();
        if (data.length > 1e6) {
            res.statusCode = 413;
            res.end("Payload too large");
        }
    });
    req.on("end", () => {
        if (!data) {
            req.body = {};
            return next();
        }
        try {
            req.body = JSON.parse(data);
            next();
        }
        catch (err) {
            res.statusCode = 400;
            res.end("Invalid JSON");
        }
    });
};
use(jsonMiddleware);
//# sourceMappingURL=json.js.map