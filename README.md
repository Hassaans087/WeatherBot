
# 🌤️ Dialogflow ES Weather Bot

This is a sample weather bot built using Dialogflow ES, Node.js, and the OpenWeather API. It responds to user queries like current weather and 7-day forecast based on city names.

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/dialogflow-weather-bot.git
cd dialogflow-weather-bot
```

### 2. Install Dependencies

Make sure you have Node.js installed (version 14 or above recommended). Then run:

```bash
npm install
```

### 3. Create a `.env` File (Optional)

You can store your API key in a `.env` file for better security:

```env
OPENWEATHER_API_KEY=your_openweather_api_key_here
```

> Replace `your_openweather_api_key_here` with your actual key from [OpenWeather](https://openweathermap.org/api).

Alternatively, replace the `OPENWEATHER_API_KEY` constant in `index.js` directly.

### 4. Start the Server

```bash
node index.js
```

The server will run on `http://localhost:3000`.

---

## ⚙️ Dialogflow Configuration

### 1. Create a Dialogflow Agent

- Go to [Dialogflow Console](https://dialogflow.cloud.google.com/)
- Create a new agent

### 2. Enable Webhook Fulfillment

- Go to **Fulfillment**
- Enable webhook and set the URL to your deployed server:
  ```
  https://your-server.com/webhook
  ```

### 3. Create the Intents

#### 🤖 Default Welcome Intent
- Enable webhook fulfillment
- Leave default training phrases or add custom ones
- The webhook will respond with:
  > "Hi! I’m Weather Bot. How can I help you today?"

#### 🌦️ GetCurrentWeather
- Training phrases: “What’s the weather in London?”, “Weather in Tokyo”
- Parameter: `geo-city` with entity `@sys.geo-city`
- Enable webhook fulfillment

#### 📅 GetForecastWeather
- Training phrases: “Give me a 7-day forecast for New York”, “Forecast in Mumbai”
- Parameter: `geo-city` with entity `@sys.geo-city`
- Enable webhook fulfillment

---

## 🚀 Deployment Steps

You can deploy the webhook using any Node.js-compatible platform:

### Option 1: Render / Railway

1. Push code to GitHub
2. Import project into [Render](https://render.com/) or [Railway](https://railway.app/)
3. Set environment variable `OPENWEATHER_API_KEY`
4. Add your webhook URL to Dialogflow

### Option 2: Deploy on VPS

1. Clone repo on server
2. Run:
```bash
npm install
node index.js
```
3. Use `pm2` or a similar process manager to keep it alive

---

## 📂 Project Structure

```
weather-bot/
├── index.js           # Main Express server
├── package.json
└── README.md          # Setup instructions
```

---

## 📄 License

MIT

