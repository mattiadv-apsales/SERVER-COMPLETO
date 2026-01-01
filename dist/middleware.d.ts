import { IncomingMessage, ServerResponse } from "node:http";
export type Middleware = (req: IncomingMessage, res: ServerResponse, next: () => void) => void;
export declare function use(mw: Middleware): void;
export declare function runMiddleware(req: IncomingMessage, res: ServerResponse, final: () => void): void;
//# sourceMappingURL=middleware.d.ts.map