import { IncomingMessage, ServerResponse } from "node:http";

export type Middleware = (req: IncomingMessage, res: ServerResponse, next: () => void) => void;

const middleware: Middleware[] = [];

export function use(mw: Middleware) {
    middleware.push(mw);
}

export function runMiddleware(req: IncomingMessage, res: ServerResponse, final: () => void) {
    let index = 0;

    function next() {
        const mw = middleware[index++];
        if (mw) {
            mw(req, res, next);
        } else {
            final();
        }
    }

    next();
}