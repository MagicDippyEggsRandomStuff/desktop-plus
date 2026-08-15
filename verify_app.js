const { chromium } = require('playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');

function serveStatic(req, res) {
  let filePath = path.join(__dirname, 'out', req.url === '/' ? 'index.html' : req.url);
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(__dirname, 'out', 'index.html');
  }
  const ext = path.extname(filePath);
  const contentTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.svg': 'image/svg+xml',
    '.woff2': 'font/woff2'
  };
  const contentType = contentTypes[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500);
      res.end('Server Error');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
}

async function run() {
  fs.mkdirSync('/home/jules/verification/videos', { recursive: true });
  fs.mkdirSync('/home/jules/verification/screenshots', { recursive: true });

  const server = http.createServer(serveStatic);
  await new Promise(resolve => server.listen(3005, resolve));

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    recordVideo: { dir: '/home/jules/verification/videos' },
    viewport: { width: 412, height: 915 } // Mobile viewport
  });
  const page = await context.newPage();

  page.on('console', msg => console.log(`[Browser Console] ${msg.type()}: ${msg.text()}`));
  page.on('pageerror', err => console.log(`[Browser PageError]`, err));

  await page.goto('http://localhost:3005/index.html');
  await page.waitForTimeout(5000);

  const html = await page.evaluate(() => document.body.innerHTML);
  console.log("BODY HTML:", html);

  await page.screenshot({ path: '/home/jules/verification/screenshots/verification.png' });
  await page.waitForTimeout(1000);

  await context.close();
  await browser.close();
  server.close();
  console.log("Verification script complete!");
}

run().catch(err => {
  console.error("Verification failed:", err);
  process.exit(1);
});
