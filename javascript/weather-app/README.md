# ☀️ Weather Arena: API & Geolocation Practice Project (OpenWeatherMap)

Welcome to the Weather Dashboard project! This standalone workspace is designed to help you master **asynchronous JavaScript**, **external API integration**, and native **web APIs** (like Geolocation and LocalStorage) using vanilla HTML, CSS, and JS.

## 🎓 What You Will Learn
1. **API Integration**: Querying a real-world current weather data service with query parameters.
2. **Key Security & Fallbacks**: Handling API keys securely in a frontend application, warning the user if configuration is missing, and setting up a local mock database fallback.
3. **Asynchronous JS**: Writing robust code using `async`/`await`, `try`/`catch`, and handling pending network states (loading indicators, error screens).
4. **Web Browser APIs**: Interacting with native device interfaces:
   - `navigator.geolocation` for coordinates acquisition.
   - `localStorage` for search history persistence across page refreshes.
5. **Dynamic Styles**: Changing CSS classes dynamically based on fetched conditions to update backgrounds and icons.

---

## 🛠️ OpenWeatherMap API

We use the [OpenWeatherMap API](https://openweathermap.org/api) because it is the industry standard for weather forecasting queries.

### API Key Requirement
OpenWeatherMap requires a personal API Key.
1. Sign up for a free account at [openweathermap.org](https://openweathermap.org/).
2. Navigate to your API keys page and generate a key.
3. Open your JavaScript file (`script.js` or `exercise-script.js`) and replace `'YOUR_API_KEY_HERE'` with your key.
> [!NOTE]
> Free API keys can take up to 2 hours to activate after generation. While you wait, the app will run in **Offline/Mock Fallback Mode** for major cities (London, Tokyo, New York, Mumbai, Paris, Sydney).

### Endpoints Used
1. **Search by City Name**:
   - **URL**: `https://api.openweathermap.org/data/2.5/weather`
   - **Query Parameters**:
     - `q`: The city name to search (e.g. `London`).
     - `appid`: Your API key.
     - `units`: Unit system (set to `metric` for Celsius values).
   - **Example**: `https://api.openweathermap.org/data/2.5/weather?q=Tokyo&appid=YOUR_API_KEY&units=metric`

2. **Search by Coordinates (Geolocation)**:
   - **URL**: `https://api.openweathermap.org/data/2.5/weather`
   - **Query Parameters**:
     - `lat`: User latitude coordinate.
     - `lon`: User longitude coordinate.
     - `appid`: Your API key.
     - `units`: Unit system (set to `metric`).
   - **Example**: `https://api.openweathermap.org/data/2.5/weather?lat=35.6895&lon=139.6917&appid=YOUR_API_KEY&units=metric`

---

## 📁 File Structure
* [`index.html`](file:///c:/Users/shiva/OneDrive/Desktop/fullstack-trainig/javascript/weather-app/index.html): The finished, fully functional **Reference Solution**.
* [`script.js`](file:///c:/Users/shiva/OneDrive/Desktop/fullstack-trainig/javascript/weather-app/script.js): The finished solution code containing API calls, local mocks, and geolocation integrations.
* [`exercise.html`](file:///c:/Users/shiva/OneDrive/Desktop/fullstack-trainig/javascript/weather-app/exercise.html): The student's workspace sandbox page.
* [`exercise-script.js`](file:///c:/Users/shiva/OneDrive/Desktop/fullstack-trainig/javascript/weather-app/exercise-script.js): The starter template script containing `TODO` code comments for you to write.
* [`style.css`](file:///c:/Users/shiva/OneDrive/Desktop/fullstack-trainig/javascript/weather-app/style.css): The CSS file containing modern glassmorphism panels, search styling, and weather state animations.

---

## 🚀 Steps to Complete the Exercise

Open [`exercise-script.js`](file:///c:/Users/shiva/OneDrive/Desktop/fullstack-trainig/javascript/weather-app/exercise-script.js) and implement the following TODO tasks:

1. **API Key Setup**: Define your personal key or leave it as the placeholder to run in fallback mock mode.
2. **Weather ID Mapper**: Map the integer weather IDs returned by OpenWeatherMap to condition emojis and theme classes:
   - `2xx`: Thunderstorm (`theme-thunder`)
   - `3xx` and `5xx`: Rain/Drizzle (`theme-rainy`)
   - `6xx`: Snow (`theme-snowy`)
   - `7xx`: Atmospheric Haze/Fog (`theme-cloudy`)
   - `800`: Clear Sky (`theme-sunny`)
   - `801-804`: Clouds (`theme-cloudy`)
3. **Metric Unit Converters**: Implement conversion formulas to support metric-to-imperial toggles:
   - Fahrenheit: `(Celsius * 9/5) + 32`
   - Wind speed: `Kilometers per Hour * 0.621371` (to convert km/h to mph)
   - Precipitation: `Millimeters / 25.4` (convert to inches)
4. **Recent Searches (LocalStorage)**: Implement localStorage caching. Load queries on mount and render recent clickable chips so users can click a chip to query the city again.
5. **Weather API Fetch**: Implement an asynchronous call to the OpenWeatherMap endpoint `api.openweathermap.org/data/2.5/weather` by city name or coordinates.
6. **DOM Rendering & Theme Updates**: Select and update HTML elements. Replace standard card themes based on weather condition codes.
7. **Device Geolocation**: Implement the native Geolocation API (`navigator.geolocation.getCurrentPosition`) to fetch coordinates automatically.
8. **Register Event Listeners**: Attach search submittals, geolocation clicks, and metric toggle actions.

*Open [`exercise.html`](file:///c:/Users/shiva/OneDrive/Desktop/fullstack-trainig/javascript/weather-app/exercise.html) in your browser to test your changes in real-time!*
