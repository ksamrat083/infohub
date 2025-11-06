import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
    origin: [
      "http://localhost:5173",                     
      "https://infohub-nine-chi.vercel.app",       
    ],
    methods: ["GET", "POST"],
  })
);
app.use(express.json());

app.get("/api/weather", async (req, res) => {
  const city = req.query.city || "Delhi";
  const key = process.env.OPENWEATHER_KEY;
  const useReal = !!key;

  try {
    if (useReal) {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
      const response = await axios.get(url, { timeout: 8000 });

      if (response.data && response.data.main) {
        return res.json({
          city: response.data.name,
          country: response.data.sys.country,
          temp_c: response.data.main.temp,
          description: response.data.weather[0].description,
          humidity: response.data.main.humidity,
        });
      }
    }
  } catch (err) {
    console.error("Weather API error:", err.message);
  }

  const mock = {
    city,
    country: "IN",
    temp_c: 28.0,
    description: "clear sky (mock)",
    humidity: 45,
    note: "Using mock weather data",
  };
  res.json(mock);
});

app.get("/api/convert", async (req, res) => {
  const from = (req.query.from || "INR").toUpperCase();
  const to = (req.query.to || "USD").toUpperCase();
  const amount = parseFloat(req.query.amount || 1);

  const useReal = process.env.USE_REAL_EXCHANGE === "true";
  const url = `https://open.er-api.com/v6/latest/${from}`;

  try {
    if (useReal) {
        const response = await axios.get(url, { timeout: 8000 });
        const rate = response.data?.rates?.[to];
        if (rate) {
            const result = +(amount * rate).toFixed(4);
            return res.json({
            query: { from, to, amount },
            result,
            rate,
            note: "Using open.er-api.com (no key needed)"
        });
    }
    else {
        console.warn("No rate found for", to);
    }
    }
  } catch (error) {
    console.error("Exchange API error:", error.message);
  }

  const fallbackRates = { USD: 0.012, EUR: 0.011 };
  const rate = fallbackRates[to] || 1;
  const result = +(amount * rate).toFixed(4);

  res.json({
    query: { from, to, amount },
    result,
    rate,
    note: "Using fallback mock conversion",
  });
});

import https from "https";

app.get("/api/quote", async (req, res) => {
  try {
    const agent = new https.Agent({ rejectUnauthorized: false });

    const response = await fetch(process.env.QUOTE_API_URL, { agent });
    if (!response.ok) throw new Error("Quote API error");

    const data = await response.json();

    res.json({
      text: data.content || "Keep going, you’re doing great!",
      author: data.author || "Unknown",
    });
  } catch (err) {
    console.error("Quote API error:", err.message);

    res.json({
      text: "The harder you work for something, the greater you’ll feel when you achieve it.",
      author: "Anonymous",
      note: "Using fallback quote",
    });
  }
});


app.get("/", (req, res) => {
  res.json({ message: "InfoHub Backend is running 🚀" });
});

app.listen(PORT, () => {
  console.log(`✅ Backend running on port ${PORT}`);
});
