import { IncomingMessage } from "node:http";
import type { Middleware } from "../middleware.js";
export interface SessionRequest extends IncomingMessage {
    session?: any;
}
export declare function destroySession(sid: string): void;
export declare const sessionMiddleware: Middleware;
//# sourceMappingURL=sessions.d.ts.map