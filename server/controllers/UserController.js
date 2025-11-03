import axios from "axios";

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const res = await axios.post(
      "https://mobil.itmc.tu-dortmund.de/oauth2/v2/access_token",
      {
        username: username,
        password: password,
        grant_type: "password",
      }
    );

    return res.json({
      accessToken: res.data.access_token,
    });
  } catch (err) {
    console.error("Error at Login", err);
    return res.status(500).json({ error: "Failed to authenticate user." });
  }
};
