import fs from "node:fs";
import path from "node:path";
import { use } from "../middleware.js";
import { mimeTypes } from "./mime.js";
import type { Middleware } from "../middleware.js";

export function staticMiddleware(root: string) {
    const absoluteRoot = path.join(process.cwd(), root);

    const mw: Middleware = (req, res, next) => {
        if (!req.url || req.method !== "GET") {
            next();
            return;
        }

        let filePath = req.url.split("?")[0];
        if (filePath === "/" || filePath === "/index") {
            next();
            return;
        }

        const fullPath = path.join(absoluteRoot, filePath!);
        
        if (!fullPath.startsWith(absoluteRoot)) {
            res.statusCode = 403;
            res.end("Forbidden");
            return;
        }

        fs.readFile(fullPath, (err, data) => {
            if (err) {
                next();
                return;
            }

            const ext = path.extname(fullPath);
            const contentType = mimeTypes[ext] || "application/octet-stream";

            res.setHeader("Content-Type", contentType);
            res.end(data);
        })
    }

    use(mw);
}