import express, { type Request, type Response } from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;

type ErrorBody = { error: string };

async function proxyJson(url: string): Promise<any> {
  const resp = await fetch(url);
  if (!resp.ok) {
    const text = await resp.text().catch(() => '');
    throw new Error(`Upstream error (${resp.status}): ${text || resp.statusText}`);
  }
  return resp.json();
}

app.get('/api/geocoding', async (req: express.Request, res: express.Response) => {
  try {
    const name = String(req.query.name || '').trim();
    if (!name) return res.status(400).json({ error: 'Missing query param: name' } satisfies ErrorBody);

    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(name)}&count=5&language=pt&format=json`;
    const data = await proxyJson(url);
    res.json(data);
  } catch (e: any) {
    res.status(500).json({ error: e?.message || 'Internal error' } satisfies ErrorBody);
  }
});

app.get('/api/clima', async (req: express.Request, res: express.Response) => {
  try {
    const lat = String(req.query.lat || '').trim();
    const lng = String(req.query.lng || '').trim();
    if (!lat || !lng) return res.status(400).json({ error: 'Missing query params: lat, lng' } satisfies ErrorBody);

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${encodeURIComponent(lat)}&longitude=${encodeURIComponent(lng)}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m,precipitation,cloud_cover&daily=temperature_2m_max,temperature_2m_min,weather_code,precipitation_sum&timezone=auto&forecast_days=7`;
    const data = await proxyJson(url);
    res.json(data);
  } catch (e: any) {
    res.status(500).json({ error: e?.message || 'Internal error' } satisfies ErrorBody);
  }
});

app.get('/api/restcountries', async (req: express.Request, res: express.Response) => {
  try {
    const name = String(req.query.name || '').trim();
    if (!name) return res.status(400).json({ error: 'Missing query param: name' } satisfies ErrorBody);

    const url = `https://restcountries.com/v3.1/name/${encodeURIComponent(name)}?fields=name,cca2,capital,population,area,currencies,continents`;
    const data = await proxyJson(url);
    res.json(data);
  } catch (e: any) {
    res.status(500).json({ error: e?.message || 'Internal error' } satisfies ErrorBody);
  }
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`[backend] running on http://localhost:${PORT}`);
});

