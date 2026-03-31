import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { to, report, birthInfo } = req.body;

    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: to,
      subject: '사주사구 분석 리포트가 도착했어요 🔮',
      html: `
        <div style="max-width:600px;margin:0 auto;font-family:'Apple SD Gothic Neo',sans-serif;color:#1e1c1a;">
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
            © 2026 사주사구 · 디지털 명리 분석 서비스<br>
            사주는 정해진 운명이 아니라 나를 이해하는 도구예요 🌸
          </div>
        </div>
      `
    });

    if (error) {
      return res.status(400).json({ error });
    }

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}