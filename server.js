// =====================================================================
// ASTRA TOMBALA OS · WI-FI ERİŞİM NOKTASI & CANLI SENKRONİZASYON SUNUCUSU
// =====================================================================
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { WebSocketServer } = require('ws');

const PORT = process.env.PORT || 3000;
const WWW_DIR = path.join(__dirname, 'www');

// Yerel Wi-Fi ve Hotspot IP adreslerini otomatik tespit et
function getLocalIpAddresses() {
  const interfaces = os.networkInterfaces();
  const addresses = [];
  for (const name of Object.keys(interfaces)) {
    for (const net of interfaces[name]) {
      // IPv4 ve harici adresleri filtrele
      if (net.family === 'IPv4' && !net.internal) {
        addresses.push({ iface: name, ip: net.address });
      }
    }
  }
  return addresses;
}

// Global oyun durumu (tüm Wi-Fi istemcileri için ortak senkron belleği)
let gameState = {
  called: [],
  history: [],
  cards: [],
  TARGET: 'c1',
  doneFlags: { c1: false, c2: false },
  extFlags: { c1: false, c2: false },
  lastMark: null,
  revision: 0,
  updatedAt: Date.now()
};

// MIME türleri
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml'
};

// HTTP Sunucusu
const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  // API endpoint'leri
  if (url.pathname === '/api/state') {
    if (req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
      return res.end(JSON.stringify(gameState));
    }
    if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => { body += chunk; });
      req.on('end', () => {
        try {
          const payload = JSON.parse(body);
          gameState = {
            ...gameState,
            ...(payload.state || payload),
            revision: gameState.revision + 1,
            updatedAt: Date.now()
          };
          broadcastToClients({ type: 'state-sync', data: gameState });
          res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
          res.end(JSON.stringify({ success: true, revision: gameState.revision }));
        } catch (e) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: e.message }));
        }
      });
      return;
    }
  }

  // Statik Dosya Sunumu
  let filePath = path.join(WWW_DIR, url.pathname === '/' ? 'index.html' : url.pathname);
  if (!fs.existsSync(filePath)) {
    filePath = path.join(WWW_DIR, 'index.html');
  }

  const ext = path.extname(filePath);
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500);
      res.end('Dosya okunamadı: ' + err.message);
    } else {
      res.writeHead(200, { 'Content-Type': contentType, 'Cache-Control': 'no-cache' });
      res.end(content);
    }
  });
});

// WebSocket Sunucusu (Gerçek Zamanlı İki Yönlü Wi-Fi Senkronizasyon)
const wss = new WebSocketServer({ server });
const clients = new Set();

wss.on('connection', ws => {
  clients.add(ws);
  console.log(`[Wi-Fi Sync] Yeni cihaz bağlandı! Toplam aktif cihaz: ${clients.size}`);

  // İlk bağlantıda mevcut durumu gönder
  ws.send(JSON.stringify({ type: 'state-sync', data: gameState }));

  ws.on('message', message => {
    try {
      const msg = JSON.parse(message);
      if (msg.type === 'state-sync' && msg.data) {
        gameState = {
          ...gameState,
          ...msg.data,
          revision: gameState.revision + 1,
          updatedAt: Date.now()
        };
        // Diğer tüm bağlı cihazlara yay
        broadcastToClients({ type: 'state-sync', data: gameState }, ws);
      }
    } catch (e) {
      console.error('[Wi-Fi Sync Hata]', e.message);
    }
  });

  ws.on('close', () => {
    clients.delete(ws);
    console.log(`[Wi-Fi Sync] Cihaz ayrıldı. Kalan: ${clients.size}`);
  });
});

function broadcastToClients(data, senderWs = null) {
  const payload = JSON.stringify(data);
  for (const client of clients) {
    if (client !== senderWs && client.readyState === 1) { // OPEN
      client.send(payload);
    }
  }
}

server.listen(PORT, '0.0.0.0', () => {
  console.log('=================================================================');
  console.log('🚀 ASTRA TOMBALA OS · WI-FI ERİŞİM NOKTASI SENKRON SUNUCUSU AÇIK!');
  console.log('=================================================================');
  const ips = getLocalIpAddresses();
  console.log('Aynı Wi-Fi veya Kişisel Erişim Noktasına (Hotspot) bağlı cihazlar');
  console.log('aşağıdaki adreslerden herhangi birini tarayıcıda açabilir:');
  console.log('');
  ips.forEach(({ iface, ip }) => {
    console.log(`  👉 [${iface}] http://${ip}:${PORT}`);
  });
  console.log(`  👉 [Localhost] http://localhost:${PORT}`);
  console.log('=================================================================');
});
