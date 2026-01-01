import { IncomingMessage, ServerResponse } from "node:http";
import { use } from "../middleware.js";
import type { Middleware } from "../middleware.js";
import { randomBytes } from "node:crypto";

const sessions: Record<string, any> = {};
const COKIE_NAME = "SID";

export interface SessionRequest extends IncomingMessage {
    session?: any;
}

function parseCookies(req: IncomingMessage) {
    const headers = req.headers.cookie;
    const list: Record<string, string> = {};
    if (!headers) return list;

    headers.split(";").forEach(cookie => {
        const [name, ...rest] = cookie.split("=");
        if (!name) return;
        list[name.trim()] = rest.join("=").trim();
    })

    return list;
}

export function destroySession(sid: string) {
    delete sessions[sid];
}

export const sessionMiddleware: Middleware = (req: SessionRequest, res, next) => {
    const cookies = parseCookies(req);
    let sid = cookies[COKIE_NAME];

    if (!sid || !sessions[sid]) {
        sid = randomBytes(16).toString("hex");
        sessions[sid] = {};
        res.setHeader("Set-Cookie", `${COKIE_NAME}=${sid}; HttpOnly; Path=/`);
    }

    req.session = sessions[sid];
    next();
}

use(sessionMiddleware);