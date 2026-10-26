export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const discordRes = await fetch(
      'https://discord.com/api/v9/unique-username/username-attempt-unauthed',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
        },
        body: JSON.stringify(req.body),
      }
    );

    const data = await discordRes.json();
    return res.status(discordRes.status).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
