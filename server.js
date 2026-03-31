import { createServer } from 'http';
import { calculateSaju } from '@orrery/core/saju';
import { createChart } from '@orrery/core/ziwei';
import { calculateNatal } from '@orrery/core/natal';
import { Resend } from 'resend';
import { config } from 'dotenv';

config();

const resend = new Resend(process.env.RESEND_API_KEY);

const server = createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200); res.end(); return;
  }

  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', async () => {
    try {
      if (req.method === 'POST' && req.url === '/api/saju') {
        const { year, month, day, hour, minute, gender, latitude, longitude } = JSON.parse(body);
        const input = { year, month, day, hour, minute, gender };
        const saju = calculateSaju(input);
        const ziwei = createChart(year, month, day, hour, minute, gender === 'M');
        const natal = await calculateNatal({ ...input, latitude, longitude });
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ saju, ziwei, natal }));

      } else if (req.method === 'POST' && req.url === '/api/send-email') {
        const { to, report, birthInfo } = JSON.parse(body);
        const { data, error } = await resend.emails.send({
          from: 'onboarding@resend.dev',
          to: to,
          subject: '사주사구 분석 리포트가 도착했어요 🔮',
          html: `
            <div style="max-width:600px;margin:0 auto;font-family:sans-serif;color:#1e1c1a;">
              <div style="background:#ff6b4a;padding:2rem;text-align:center;border-radius:16px 16px 0 0;">
                <h1 style="color:#fff;font-size:1.5rem;margin:0;">사주사구 분석 리포트</h1>
                <p style="color:rgba(255,255,255,0.8);margin:0.5rem 0 0;">첨단 기술로 분석하는 사주</p>
              </div>
              <div style="background:#fff;padding:2rem;border:1px solid #eee;">
                <p style="color:#5c5450;font-size:0.9rem;margin-bottom:1.5rem;">
                  ${birthInfo} 님의 분석 리포트예요.<br>
                  언제든 이 메일을 다시 열어서 확인하실 수 있어요.
                </p>
                <div style="background:#fffef9;border-radius:12px;padding:1.5rem;border:1px solid #f0ece6;white-space:pre-wrap;font-size:0.875rem;line-height:1.9;color:#1e1c1a;">
${report}
                </div>
              </div>
              <div style="background:#f8f4ef;padding:1.5rem;text-align:center;border-radius:0 0 16px 16px;font-size:0.75rem;color:#a09890;">
                © 2026 사주사구 · 디지털 명리 분석 서비스
              </div>
            </div>
          `
        });
        if (error) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error }));
        } else {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true }));
        }

      } else {
        res.writeHead(404); res.end();
      }
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    }
  });
});

server.listen(3001, () => console.log('API 서버 실행 중: http://localhost:3001'));