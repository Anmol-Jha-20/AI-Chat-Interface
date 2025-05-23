const API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API_KEY; // I am using free Open Weather Map Api

export const weatherPlugin = {
  name: "weather",
  trigger: /^\/weather\s+(.+)/i,

  match(input) {
    const regex =
      /(?:weather\s+in|what(?:'s| is)\s+the\s+weather\s+in)\s+(.+)/i;
    const match = input.match(regex);
    if (match) {
      const cleanedCity = match[1].trim().replace(/[?.!]+$/, ""); // Remove trailing punctuation
      return [null, cleanedCity];
    }
    return false;
  },

  async execute(match) {
    const city = match[1].trim();
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city
    )}&appid=${API_KEY}&units=metric`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log("Weather API data:", data);

      if (data.cod !== 200) {
        return {
          pluginName: "weather",
          pluginData: {
            error: `City "${city}" not found.`,
          },
        };
      }

      const weather = data.weather?.[0] || { main: "Unknown", icon: "01d" };

      return {
        pluginName: "weather",
        pluginData: {
          city: data.name || city,
          temp: Math.round(data.main?.temp ?? 0),
          condition: weather.main,
          icon: weather.icon,
        },
        output: `🌤️ Weather in ${data.name}: ${weather.main}, ${Math.round(
          data.main?.temp ?? 0
        )}°C`,
      };
    } catch (err) {
      return {
        output: "Failed to fetch weather data.",
        error: true,
      };
    }
  },
};
