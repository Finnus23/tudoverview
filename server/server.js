const axios = require('axios');
const cors = require('cors');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post('/api/user/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const response = await axios.post(
      'https://mobil.itmc.tu-dortmund.de/oauth2/v2/access_token',
      {
        username: username,
        password: password,
        grant_type: 'password',
      }
    );

    const { access_token } = response.data;
    return res.json({
      accessToken: access_token,
    });
  } catch (error) {
    console.error('Error during OAuth login:', error);
    return res.status(500).json({ error: 'Failed to authenticate user.' });
  }
});

app.get('/api/user/me', async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Missing Authorization header' });
  }

  const accessToken = authHeader.split(' ')[1];

  try {
    const response = await axios.get(
      'https://mobil.itmc.tu-dortmund.de/oauth2/v2/tokeninfo',
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    const user = response.data;

    return res.json({ user });
  } catch (err) {
    console.error('Error fetching user data:', err);
    return res
      .status(500)
      .json({ error: 'Failed to fetch user data. Please try again later.' });
  }
});

app.get('/api/user/courses', async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Missing Authorization header' });
  }

  const accessToken = authHeader.split(' ')[1];

  try {
    const response = await axios.get(
      'https://mobil.itmc.tu-dortmund.de/lsf/v3/courses',
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    const courses = response.data;

    return res.json({ courses });
  } catch (err) {
    console.error('Fehler beim fetchen der Courses', err);
    return res.status(500).json({
      error: 'Fehler beim laden der Kursdaten. Versuche es später erneut.',
    });
  }
});

app.get('/api/user/timetable', async (req, res) => {
  const authHeader = req.headers.authorization;
  const { date } = req.query;

  console.log(date);

  if (!authHeader) {
    return res.status(401).json({ error: 'Missing Authorization header' });
  }

  const accessToken = authHeader.split(' ')[1];

  try {
    const response = await axios.get(
      `https://mobil.itmc.tu-dortmund.de/lsf/v3/lsfEvents?date=${date}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    const timetable = response.data;

    return res.json({ timetable });
  } catch (err) {
    console.error('Fehler beim fetchen des Stundenplans', err);
    return res.status(500).json({
      error: 'Fehler beim laden des Stundenplans. Versuche es später erneut.',
    });
  }
});

app.get('/api/user/qrcode', async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Missing Authorization header' });
  }

  const accessToken = authHeader.split(' ')[1];

  try {
    const response = await axios.get(
      'https://mobil.itmc.tu-dortmund.de/campus-id/v1/totp/secret',
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    const qrcode = response.data;

    return res.json({ qrcode });
  } catch (err) {
    console.error('Fehler beim fetchen der Courses', err);
    return res.status(500).json({
      error: 'Fehler beim laden der Kursdaten. Versuche es später erneut.',
    });
  }
});

app.get('/api/canteens', async (req, res) => {
  try {
    const res = await axios.get(
      ' https://mobil.itmc.tu-dortmund.de/canteen-menu/v3/canteens'
    );

    const canteens = res.data;

    return res.json({
      canteens,
    });
  } catch (err) {
    console.error('Error fetching Canteens', err);
    return res
      .status(500)
      .json({ error: 'Error fetching Canteens. Please try again later.' });
  }
});

app.get('/api/wether', async (req, res) => {
  try {
    const response = await axios.get(
      'https://mobil.itmc.tu-dortmund.de/weather/v1/current'
    );

    const wether = response.data;

    return res.json({
      wether,
    });
  } catch (err) {
    console.error('Error fetching Wether', err);
    return res
      .status(500)
      .json({ error: 'Error fetching Wether. Please try again later. ' });
  }
});

console.log(`Attempting to listen on port ${PORT}`);
// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
