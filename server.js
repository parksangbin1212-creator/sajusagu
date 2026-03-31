import { createServer } from 'http';
import { calculateSaju } from '@orrery/core/saju';
import { createChart } from '@orrery/core/ziwei';
import { calculateNatal } from '@orrery/core/natal';

const server = createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200); res.end(); return;
  }

  if (req.method === 'POST' && req.url === '/api/saju') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const { year, month, day, hour, minute, gender, latitude, longitude } = JSON.parse(body);
        const input = { year, month, day, hour, minute, gender };
        const saju = calculateSaju(input);
        const ziwei = createChart(year, month, day, hour, minute, gender === 'M');
        const natal = await calculateNatal({ ...input, latitude, longitude });
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ saju, ziwei, natal }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
  } else {
    res.writeHead(404); res.end();
  }
});

server.listen(3001, () => console.log('API 서버 실행 중: http://localhost:3001'));