import { createServer } from "http";
import { readFile, stat } from "fs/promises";
import { createReadStream, existsSync } from "fs";
import { extname, join, normalize } from "path";

const PORT = Number(process.env.PORT) || 3000;
const PUBLIC_DIR = join(process.cwd(), "out");

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".webp": "image/webp",
  ".txt": "text/plain; charset=utf-8",
  ".woff": "font/woff",
  ".woff2": "font/woff2"
};

function resolvePath(urlPath) {
  const sanitized = normalize(urlPath).replace(/^\/+/, "");
  if (!sanitized) {
    return join(PUBLIC_DIR, "index.html");
  }
  return join(PUBLIC_DIR, sanitized);
}

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url ?? "", "http://localhost");
    let filePath = resolvePath(url.pathname);

    if (filePath.endsWith("/")) {
      filePath = join(filePath, "index.html");
    }

    if (!existsSync(filePath)) {
      throw new Error("Not Found");
    }

    const fileStat = await stat(filePath);
    if (fileStat.isDirectory()) {
      filePath = join(filePath, "index.html");
    }

    const ext = extname(filePath).toLowerCase();
    const mime = MIME_TYPES[ext] ?? "application/octet-stream";

    res.statusCode = 200;
    res.setHeader("Content-Type", mime);
    res.setHeader("Cache-Control", "no-store");

    const stream = createReadStream(filePath);
    stream.pipe(res);
    stream.on("error", (err) => {
      console.error(err);
      res.statusCode = 500;
      res.end("Internal Server Error");
    });
  } catch (error) {
    try {
      const fallbackPath = join(PUBLIC_DIR, "index.html");
      const html = await readFile(fallbackPath);
      res.statusCode = 200;
      res.setHeader("Content-Type", MIME_TYPES[".html"]);
      res.setHeader("Cache-Control", "no-store");
      res.end(html);
    } catch (fallbackError) {
      res.statusCode = 404;
      res.end("Not Found");
    }
  }
});

server.listen(PORT, () => {
  console.log(`Static preview available at http://localhost:${PORT}`);
});
