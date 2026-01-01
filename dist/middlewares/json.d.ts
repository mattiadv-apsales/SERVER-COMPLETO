import { IncomingMessage } from 'http';
import type { Middleware } from '../middleware.js';
export interface JSONRequest extends IncomingMessage {
    body?: any;
}
export declare const jsonMiddleware: Middleware;
//# sourceMappingURL=json.d.ts.map