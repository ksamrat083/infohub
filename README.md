# InfoHub 

**InfoHub** is a full-stack web application.  
It combines **three everyday utilities** — Weather Information, Currency Conversion, and Motivational Quotes — into one clean, interactive interface.

Deployed live on **Vercel**, InfoHub demonstrates a seamless integration between a **React frontend** and a **Node.js + Express backend** (via Vercel Serverless Functions).

---

## 🚀 Live Demo

- 🌍 **Live URL:** [https://infohub-nine-chi.vercel.app/](https://infohub-nine-chi.vercel.app/)  
- 🎥 **Demo Video:** *(Add Google Drive link once uploaded)*

---

## 🧩 Features

### 🌦️ Weather Information
- Get real-time weather details for any city.  
- Shows temperature (°C), humidity, and description.  
- Powered by the **OpenWeatherMap API**.  
- Gracefully handles invalid cities or API failures.

### 💱 Currency Converter
- Converts **INR → USD / EUR** (or any pair you define).  
- Fetches real-time rates using **open.er-api.com**.  
- Includes fallback conversion logic if API fails.

### 💬 Motivational Quote Generator
- Fetches inspiring quotes from **quotable.io**.  
- Displays author and handles API errors with fallback quotes.

---

## ⚙️ Tech Stack

| Layer | Technology |
|--------|-------------|
| **Frontend** | React (Vite) |
| **Styling** | Tailwind CSS |
| **Backend** | Node.js + Express (Vercel Serverless API) |
| **APIs Used** | OpenWeatherMap, open.er-api.com, ZenQuotes.io |
| **Deployment** | Vercel |
| **Version Control** | Git + GitHub |

---

## 📁 Project Structure

InfoHub/
│
├── backend/
│ └── index.js # Express backend (serverless functions for Vercel)
│ └── package.json
│
├── frontend/
│ ├── src/
│   ├── modules/
│   │ ├── WeatherModule.jsx
│   │ ├── ConvertModule.jsx
│   │ ├── QuoteModule.jsx
│   ├── App.jsx
│   └── main.jsx
│
├── .env # API keys (not committed)
├── package.json
├── vite.config.js
└── README.md


---

## 🔐 Environment Variables

Create a `.env` file in the project root (or set on Vercel → Project Settings → Environment Variables):

```env
OPENWEATHER_KEY=449a912d92f755d916f6bb0062034faf
USE_REAL_EXCHANGE=true
QUOTE_API_URL=https://api.quotable.io/random
PORT=4000
```
⚠️ Keep .env private — do not push it to GitHub.


💻 Local Development Setup

To run the project locally using Git Bash:
# 1️⃣ Clone the repository
```
git clone https://github.com/<your-username>/InfoHub.git
cd InfoHub
```

# 2️⃣ Install dependencies
```
npm install
```

# 3️⃣ Add your .env file (see above)

# 4️⃣ Run locally
```
npm run dev
```

Then open the app in your browser at:
👉 http://localhost:5173


🚢 Deployment (Vercel)

Push your repo to GitHub (single full-stack project).

Go to https://vercel.com
 → New Project.

Import your GitHub repository.

Add environment variables (from .env).

Click Deploy.

✅ Vercel automatically builds both frontend and backend.


🧠 Error Handling & Fallbacks

Each module includes built-in fallback logic:

Weather → returns mock data if API unavailable.

Converter → uses static rate if live API fails.

Quotes → returns default motivational quote if API error.

This ensures a smooth experience even with network/API issues.


👨‍💻 Author

Samrat Kavide
Full Stack Developer | ByteXL Challenge Participant

🔗 https://infohub-nine-chi.vercel.app/
