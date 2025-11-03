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

console.log(`Attempting to listen on port ${PORT}`);
// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
