import { IncomingMessage, ServerResponse } from "http";
import { runMiddleware } from "./middleware.js";
import fs from "node:fs";
import path from "node:path";

type handler = (req: IncomingMessage, res: ServerResponse) => void;
type RouteHandler = handler | string;
const routes: Record<string, handler> = {};

function pathJoin(...segments: string[]) {
    return path.join(process.cwd(), ...segments);
}

export function get(path: string, handler: RouteHandler) {
    if (typeof handler === "string") {
        routes[`GET ${path}`] = (_, res) => {
            const filePath = pathJoin("public", handler);

            fs.readFile(filePath, "utf-8", (err, data) => {
                if (err) {
                    res.statusCode = 500;
                    res.end("Internal Server Error");
                    return;
                }

                res.setHeader("Content-Type", "text/html; charset=utf-8");
                res.end(data);
            })
        }
    } else {
        routes[`GET ${path}`] = handler;
    }
}

export function post(path: string, handler: handler) {
    routes[`POST ${path}`] = handler;
}

export function router(req: IncomingMessage, res: ServerResponse) {
    let url: string = req.url || "/";
    let clearUrl = url.split("?")[0]?.replace(/\/+/g, "/") || "/";
    url = clearUrl;
    if (url.length > 1 && url.endsWith("/")) {
        url = url.slice(0, -1);
    }

    runMiddleware(req, res, () => {
        const key = `${req.method} ${url}`;
        const route = routes[key];

        if (!route) {
            res.statusCode = 404;
            res.end("Not Found");
            return;
        }

        route(req, res);
    })
}