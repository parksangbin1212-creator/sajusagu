import { calculateSaju } from '@orrery/core/saju';
import { createChart } from '@orrery/core/ziwei';
import { calculateNatal } from '@orrery/core/natal';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { year, month, day, hour, minute, gender, latitude, longitude } = req.body;

    const input = { year, month, day, hour, minute, gender };

    const saju = calculateSaju(input);
    const ziwei = createChart(year, month, day, hour, minute, gender === 'M');
    const natal = await calculateNatal({
      ...input,
      latitude: latitude || 37.5665,
      longitude: longitude || 126.9780
    });

    res.status(200).json({ saju, ziwei, natal });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}