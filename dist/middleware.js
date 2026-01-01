import { IncomingMessage, ServerResponse } from "node:http";
const middleware = [];
export function use(mw) {
    middleware.push(mw);
}
export function runMiddleware(req, res, final) {
    let index = 0;
    function next() {
        const mw = middleware[index++];
        if (mw) {
            mw(req, res, next);
        }
        else {
            final();
        }
    }
    next();
}
//# sourceMappingURL=middleware.js.map