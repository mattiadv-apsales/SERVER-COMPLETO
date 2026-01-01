import { IncomingMessage, ServerResponse } from "http";
type handler = (req: IncomingMessage, res: ServerResponse) => void;
type RouteHandler = handler | string;
export declare function get(path: string, handler: RouteHandler): void;
export declare function post(path: string, handler: handler): void;
export declare function router(req: IncomingMessage, res: ServerResponse): void;
export {};
//# sourceMappingURL=router.d.ts.map