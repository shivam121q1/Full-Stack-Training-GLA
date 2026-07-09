/**
 * WEATHER ARENA - Student Practice Script
 * Integration: OpenWeatherMap API (api.openweathermap.org)
 * 
 * TODO: Complete this script by implementing API queries, DOM rendering,
 * unit conversions, localStorage history persistence, and geolocation handlers.
 */

// ==========================================================================
// 1. TODO: DEFINE API KEY
// ==========================================================================
// Retrieve a free key by registering at https://openweathermap.org/api
// Paste your key here to enable live queries:
const API_KEY = 'YOUR_API_KEY_HERE';

// ==========================================================================
// 2. DOM ELEMENTS SELECTION (Pre-selected for convenience)
// ==========================================================================
const searchForm = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');
const geoBtn = document.getElementById('geo-btn');
const unitCBtn = document.getElementById('unit-c');
const unitFBtn = document.getElementById('unit-f');
const recentContainer = document.getElementById('recent-container');
const recentList = document.getElementById('recent-list');
const keyWarningBanner = document.getElementById('key-warning-banner');

const geoBanner = document.getElementById('geo-banner');
const errorPanel = document.getElementById('error-panel');
const errorTitle = document.getElementById('error-title');
const errorMessage = document.getElementById('error-message');

const loader = document.getElementById('loader');
const loaderText = document.getElementById('loader-text');

const weatherCard = document.getElementById('weather-card');
const weatherCity = document.getElementById('weather-city');
const weatherCountry = document.getElementById('weather-country');
const weatherCoords = document.getElementById('weather-coords');
const weatherIcon = document.getElementById('weather-icon');
const tempValue = document.getElementById('temp-value');
const tempUnitLabel = document.getElementById('temp-unit');
const weatherDesc = document.getElementById('weather-desc');
const weatherFeels = document.getElementById('weather-feels');
const valHumidity = document.getElementById('val-humidity');
const valWind = document.getElementById('val-wind');
const valPrecip = document.getElementById('val-precip');

// ==========================================================================
// 3. STATE CONFIGURATION & DATA CACHE
// ==========================================================================
let currentUnit = 'C'; // 'C' (Celsius) or 'F' (Fahrenheit)
let activeWeatherData = null; // Caches active weather details for unit toggling
let searchHistory = [];

const MAX_HISTORY = 5;

// API Base URL
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Validate if API Key is configured
const isApiKeyConfigured = API_KEY && API_KEY !== 'YOUR_API_KEY_HERE' && API_KEY.trim() !== '';

// ==========================================================================
// 4. MOCK DATABASE (OFFLINE FALLBACK)
// ==========================================================================
const mockWeatherDatabase = {
    'london': { name: 'London', country: 'GB', latitude: 51.5085, longitude: -0.1257, temperature: 18.5, apparent_temperature: 17.2, weather_id: 801, relative_humidity: 64, wind_speed: 12.5, precipitation: 0.0, description: 'few clouds' },
    'tokyo': { name: 'Tokyo', country: 'JP', latitude: 35.6895, longitude: 139.6917, temperature: 26.2, apparent_temperature: 28.5, weather_id: 800, relative_humidity: 58, wind_speed: 8.0, precipitation: 0.0, description: 'clear sky' },
    'new york': { name: 'New York', country: 'US', latitude: 40.7128, longitude: -74.0060, temperature: 22.0, apparent_temperature: 21.5, weather_id: 501, relative_humidity: 82, wind_speed: 15.2, precipitation: 3.5, description: 'moderate rain' },
    'mumbai': { name: 'Mumbai', country: 'IN', latitude: 19.0760, longitude: 72.8777, temperature: 29.5, apparent_temperature: 34.2, weather_id: 211, relative_humidity: 90, wind_speed: 22.1, precipitation: 12.0, description: 'thunderstorm' },
    'paris': { name: 'Paris', country: 'FR', latitude: 48.8566, longitude: 2.3522, temperature: 20.1, apparent_temperature: 19.8, weather_id: 802, relative_humidity: 70, wind_speed: 9.5, precipitation: 0.0, description: 'scattered clouds' },
    'sydney': { name: 'Sydney', country: 'AU', latitude: -33.8688, longitude: 151.2093, temperature: 14.8, apparent_temperature: 13.5, weather_id: 301, relative_humidity: 75, wind_speed: 18.0, precipitation: 1.2, description: 'drizzle' }
};

// ==========================================================================
// 5. TODO 1: WEATHER ID MAPPER (OPENWEATHERMAP CODES)
// ==========================================================================
function getConditionDetails(id) {
    // TODO: Map OpenWeatherMap weather IDs to emojis and card class background themes.
    // Guide:
    // - 2xx (Thunderstorm): emoji '⛈️', theme 'theme-thunder'
    // - 3xx (Drizzle): emoji '🌧️', theme 'theme-rainy'
    // - 5xx (Rain): emoji '🌦️', theme 'theme-rainy'
    // - 6xx (Snow): emoji '❄️', theme 'theme-snowy'
    // - 7xx (Atmosphere/Fog/Haze): emoji '🌫️', theme 'theme-cloudy'
    // - 800 (Clear): emoji '☀️', theme 'theme-sunny'
    // - 801-804 (Clouds): emoji '⛅', theme 'theme-cloudy'
    // - Fallback: emoji '🌡️', theme 'theme-default'
    
    // Write your conditional blocks here...
    
    return { emoji: '🌡️', theme: 'theme-default' }; // placeholder
}

// ==========================================================================
// 6. TODO 2: HELPER CONVERTER FUNCTIONS
// ==========================================================================
function celsiusToFahrenheit(c) {
    // TODO: Return Fahrenheit converted from Celsius
    return c;
}

function kmtomiles(km) {
    // TODO: Return Miles converted from Kilometers (1 km = 0.621371 miles)
    return km;
}

// ==========================================================================
// 7. TODO 3: RECENT SEARCHES MANAGEMENT (LocalStorage)
// ==========================================================================
function initRecentHistory() {
    // TODO:
    // 1. Fetch item 'weather_recent_owm' from localStorage.
    // 2. If it exists, JSON parse it and save it into the global variable `searchHistory`.
    // 3. Call renderRecentHistory().
}

function addRecentCity(cityName) {
    // TODO:
    // 1. Format cityName (e.g. trim and title-case).
    // 2. Remove matching city names from searchHistory (case-insensitive) to prevent duplicates.
    // 3. Unshift (add to front) the formatted name to searchHistory.
    // 4. If searchHistory exceeds MAX_HISTORY length, pop the last element.
    // 5. Store stringified searchHistory back in localStorage under 'weather_recent_owm'.
    // 6. Call renderRecentHistory().
}

function renderRecentHistory() {
    // TODO:
    // 1. If searchHistory is empty, add class 'hidden' to `recentContainer` and return.
    // 2. Remove 'hidden' from `recentContainer` and clear `recentList` inner HTML.
    // 3. Loop through `searchHistory` and create a <button> for each city with class 'city-chip'.
    // 4. Attach click listener to each button that triggers fetchWeather(city).
    // 5. Append chip to `recentList`.
}

// ==========================================================================
// 8. TODO 4: API FETCHING & DATA PROCESSING (async/await)
// ==========================================================================
async function fetchWeather(query) {
    if (!query || (typeof query === 'string' && query.trim() === '')) return;
    
    showLoader(`Searching...`);
    hideError();
    hideWeatherCard();
    
    // Check if key is configured
    if (!isApiKeyConfigured) {
        console.warn('[Offline Mode] Using local mock database.');
        const mockData = checkMockFallback(query);
        
        // Add tiny timeout to simulate fetch query delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        if (mockData) {
            // TODO:
            // 1. Set global activeWeatherData to mockData.
            // 2. Call displayWeatherData(mockData).
            // 3. Add to recent searches using addRecentCity(mockData.name).
            // 4. Hide loader.
            return;
        } else {
            hideLoader();
            showError(
                'API Key Missing', 
                `Live searches are disabled because no API key is configured. Offline fallback matches: London, Tokyo, New York, Mumbai, Paris, Sydney.`
            );
            return;
        }
    }
    
    // TODO: Perform Live API Search
    try {
        const isCoords = typeof query === 'object' && query.latitude && query.longitude;
        let url = '';
        
        // 1. Define URL based on search mode (coords vs query string)
        if (isCoords) {
            // Target coordinates search: https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={key}&units=metric
            url = ``;
        } else {
            // Target city search: https://api.openweathermap.org/data/2.5/weather?q={city}&appid={key}&units=metric
            url = ``;
        }
        
        // 2. Fetch url response
        // 3. Check if response is ok. Throw errors for 401 (Invalid Key) and 404 (Not Found).
        // 4. Parse response JSON.
        // 5. Build a cleaned weather object and cache it inside activeWeatherData:
        /*
           activeWeatherData = {
               name: data.name,
               country: data.sys.country,
               latitude: data.coord.lat,
               longitude: data.coord.lon,
               temperature: data.main.temp,
               apparent_temperature: data.main.feels_like,
               weather_id: data.weather[0].id,
               relative_humidity: data.main.humidity,
               wind_speed: data.wind.speed * 3.6, // convert m/s to km/h
               precipitation: data.rain ? (data.rain['1h'] || data.rain['3h'] || 0) : 0,
               description: data.weather[0].description
           };
        */
        // 6. Call displayWeatherData(activeWeatherData).
        // 7. Add to search history using addRecentCity(activeWeatherData.name).
        
    } catch (error) {
        showError('Search Inquiry Failed', error.message);
    } finally {
        hideLoader();
    }
}

// ==========================================================================
// 9. TODO 5: RENDER DETAILS & INTERFACE WRITING (DOM Manipulation)
// ==========================================================================
function displayWeatherData(weather) {
    // TODO:
    // 1. Write location name and country badge code to `weatherCity.innerHTML`.
    // 2. Write formatted latitude/longitude coords (e.g. 51.5085° N, -0.1257° W) to `weatherCoords`.
    // 3. Get conditions using getConditionDetails(weather.weather_id).
    // 4. Set weatherIcon.textContent to condition.emoji and weatherDesc.textContent to weather.description.
    // 5. Clean weatherCard.className list and add 'glass-panel', 'weather-card' and condition.theme.
    // 6. Call updateTemperatureDisplay(weather).
    // 7. Update relative humidity metric in `valHumidity`.
    // 8. Remove class 'hidden' from `weatherCard` to show details.
}

function updateTemperatureDisplay(weather) {
    if (!weather) return;
    
    // TODO:
    // 1. Check currentUnit state ('C' or 'F').
    // 2. If 'C' (Metric):
    //    - Set tempValue text content to weather.temperature.
    //    - Set tempUnitLabel text content to '°C'.
    //    - Set feels-like description text to `Feels like: {apparent_temperature}°C`.
    //    - Set wind speed text to `{wind_speed} km/h`.
    //    - Set precipitation text to `{precipitation} mm`.
    // 3. If 'F' (Imperial):
    //    - Convert temperature and feels-like values using celsiusToFahrenheit().
    //    - Convert wind speed using kmtomiles() and suffix with ' mph'.
    //    - Convert precipitation to inches (mm / 25.4) and suffix with ' in'.
    // 4. Ensure values are rounded to 1 decimal place (use `.toFixed(1)`).
}

// ==========================================================================
// 10. LOCAL MOCK INTERCEPTOR (Helper supplied)
// ==========================================================================
function checkMockFallback(city) {
    if (typeof city === 'object') return null;
    const key = city.trim().toLowerCase();
    if (mockWeatherDatabase[key]) {
        return { ...mockWeatherDatabase[key] };
    }
    return null;
}

// ==========================================================================
// 11. SYSTEM STATUS & STATES TOGGLE HELPERS (Supplied)
// ==========================================================================
function showLoader(msg) {
    loaderText.textContent = msg;
    loader.classList.remove('hidden');
}

function hideLoader() {
    loader.classList.add('hidden');
}

function showError(title, msg) {
    errorTitle.textContent = title;
    errorMessage.textContent = msg;
    errorPanel.classList.remove('hidden');
}

function hideError() {
    errorPanel.classList.add('hidden');
}

function hideWeatherCard() {
    weatherCard.classList.add('hidden');
}

// ==========================================================================
// 12. TODO 6: BROWSER GEOLOCATION API HANDLERS
// ==========================================================================
function handleGeolocation() {
    // TODO:
    // 1. Verify `navigator.geolocation` exists. If not, trigger showError and exit.
    // 2. Un-hide `geoBanner` by removing 'hidden', hide errorPanel and weatherCard.
    // 3. Show loader.
    // 4. Trigger `navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options)`.
    // 5. In successCallback:
    //    - Extract lat and lon coordinates.
    //    - Set geoBanner success text.
    //    - Trigger fetchWeather({ latitude: lat, longitude: lon }).
    //    - Hide loader and close geoBanner after 4 seconds.
    // 6. In errorCallback:
    //    - Handle permission denied, timeout, and coordinate unavailable codes. Show user-friendly errors.
}

// ==========================================================================
// 13. TODO 7: EVENT LISTENERS REGISTER
// ==========================================================================

// TODO:
// 1. Attach 'submit' handler to searchForm. Call e.preventDefault(). Extract city, trigger fetchWeather(city), and clear input.
// 2. Attach click handler to geoBtn calling handleGeolocation.
// 3. Attach click handler to unitCBtn. Set currentUnit = 'C', update active/inactive buttons classes, and run updateTemperatureDisplay(activeWeatherData).
// 4. Attach click handler to unitFBtn. Set currentUnit = 'F', update active/inactive buttons classes, and run updateTemperatureDisplay(activeWeatherData).

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Show key configuration warning banner if unconfigured
    if (!isApiKeyConfigured) {
        keyWarningBanner.classList.remove('hidden');
    }
    
    initRecentHistory();
    // Default load
    fetchWeather('London');
});
