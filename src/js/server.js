import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const PORT = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../../'); 

const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css',
    '.js': 'application/javascript; charset=utf-8'
};

const server = http.createServer((req, res) => {
    const parsedUrl = new URL(req.url, `http://localhost:${PORT}`);
    let safeUrl = parsedUrl.pathname;

    if (safeUrl === '/') safeUrl = '/index.html';
    const fullPath = path.join(rootDir, safeUrl);

    fs.stat(fullPath, (err, stats) => {
        if (err || !stats.isFile()) {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end(`File not found: ${safeUrl}`);
            return;
        }

        const ext = path.extname(fullPath);
        fs.readFile(fullPath, (readErr, content) => {
            if (readErr) {
                res.writeHead(500);
                res.end('Internal Server Error');
            } else {
                res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'text/plain' });
                res.end(content);
            }
        });
    });
});

server.listen(PORT, () => {
    console.log(`DEV-сервер запущен на http://localhost:${PORT}`);
});