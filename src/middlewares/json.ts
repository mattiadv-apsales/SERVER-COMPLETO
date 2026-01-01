import { IncomingMessage, ServerResponse } from 'http';
import { use } from '../middleware.js';
import type { Middleware } from '../middleware.js';

export interface JSONRequest extends IncomingMessage {
    body?: any;
}

export const jsonMiddleware: Middleware = (req: any, res, next) => {
    if (req.method !== "POST" && req.method !== "PUT" && req.method !== "PATCH") {
        return next();
    }

    let data = '';
    req.on("data", (chunk: Buffer) => {
        data += chunk.toString();

        if (data.length > 1e6) {
            res.statusCode = 413;
            res.end("Payload too large");
        }
    })

    req.on("end", () => {
        if (!data) {
            req.body = {};
            return next();
        }

        try {
            req.body = JSON.parse(data);
            next();
        } catch (err) {
            res.statusCode = 400;
            res.end("Invalid JSON");
        }
    })
}

use(jsonMiddleware);