/**
 * WEATHER ARENA - Reference Solution Script
 * Integration: OpenWeatherMap API (api.openweathermap.org)
 * Teaches: DOM selection, Event Listeners, Fetch API, Geolocation API, LocalStorage, CSS Class Modification
 */

// ==========================================================================
// 1. API KEY CONFIGURATION
// ==========================================================================
// TODO: Replace this placeholder with your real OpenWeatherMap API key (e.g. from openweathermap.org/api)
const API_KEY = '65a91f5ef3154513f15451d31bc8dbf8';

// ==========================================================================
// 2. DOM ELEMENTS SELECTION
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
let currentUnit = 'C'; // 'C' (Metric) or 'F' (Imperial)
let activeWeatherData = null; // Caches active weather details for toggles
let searchHistory = [];

const MAX_HISTORY = 5;

// API Base URLs
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
// 5. WEATHER CODE MAPPER (OPENWEATHERMAP CODES)
// ==========================================================================
function getConditionDetails(id) {
    if (id >= 200 && id < 300) {
        return { emoji: '⛈️', theme: 'theme-thunder' };
    } else if (id >= 300 && id < 400) {
        return { emoji: '🌧️', theme: 'theme-rainy' };
    } else if (id >= 500 && id < 600) {
        return { emoji: '🌦️', theme: 'theme-rainy' };
    } else if (id >= 600 && id < 700) {
        return { emoji: '❄️', theme: 'theme-snowy' };
    } else if (id >= 700 && id < 800) {
        return { emoji: '🌫️', theme: 'theme-cloudy' };
    } else if (id === 800) {
        return { emoji: '☀️', theme: 'theme-sunny' };
    } else if (id > 800 && id <= 804) {
        return { emoji: '⛅', theme: 'theme-cloudy' };
    } else {
        return { emoji: '🌡️', theme: 'theme-default' };
    }
}

// ==========================================================================
// 6. HELPER CONVERTER FUNCTIONS
// ==========================================================================
function celsiusToFahrenheit(c) {
    return (c * 9) / 5 + 32;
}

function kmtomiles(km) {
    return km * 0.621371;
}

// ==========================================================================
// 7. INITIALIZATION & RECENT SEARCHES MANAGEMENT
// ==========================================================================
function initRecentHistory() {
    const saved = localStorage.getItem('weather_recent_owm');
    if (saved) {
        try {
            searchHistory = JSON.parse(saved);
            renderRecentHistory();
        } catch (e) {
            searchHistory = [];
        }
    }
}

function addRecentCity(cityName) {
    const formattedName = cityName.trim().replace(/\b\w/g, c => c.toUpperCase());
    searchHistory = searchHistory.filter(c => c.toLowerCase() !== formattedName.toLowerCase());
    searchHistory.unshift(formattedName);

    if (searchHistory.length > MAX_HISTORY) {
        searchHistory.pop();
    }

    localStorage.setItem('weather_recent_owm', JSON.stringify(searchHistory));
    renderRecentHistory();
}

function renderRecentHistory() {
    if (searchHistory.length === 0) {
        recentContainer.classList.add('hidden');
        return;
    }

    recentContainer.classList.remove('hidden');
    recentList.innerHTML = '';

    searchHistory.forEach(city => {
        const chip = document.createElement('button');
        chip.className = 'city-chip';
        chip.textContent = city;
        chip.type = 'button';

        chip.addEventListener('click', () => {
            fetchWeather(city);
        });
        recentList.appendChild(chip);
    });
}

// ==========================================================================
// 8. API FETCHING & DATA PROCESSING
// ==========================================================================

// Core Fetch Function: Handles API queries & fallbacks
async function fetchWeather(query) {
    console.log(query);
    if (!query || query.trim() === '') {
        alert("Please fill the city")
        return;
    }

    showLoader(`Searching for "${query}"...`);
    hideError();
    hideWeatherCard();

    // Check if key is configured
    if (!isApiKeyConfigured) {
        console.warn('[Offline Mode] No API Key. Attempting Local Mock Fallback.');
        const mockData = checkMockFallback(query);

        // Wait a tiny bit to simulate network delay for teaching UI feel
        await new Promise(resolve => setTimeout(resolve, 600));

        if (mockData) {
            activeWeatherData = mockData;
            displayWeatherData(mockData);
            addRecentCity(mockData.name);
            hideLoader();
            return;
        } else {
            hideLoader();
            showError(
                'API Key Missing & City Not Mocked',
                `Live requests are disabled because no API key was configured in script.js. Local offline mock is available for: London, Tokyo, New York, Mumbai, Paris, Sydney.`
            );
            return;
        }
    }

    // Perform live API search
    try {
        const isCoords = typeof query === 'object' && query.latitude && query.longitude;
        let url = '';

        if (isCoords) {
            url = `${WEATHER_API_URL}?lat=${query.latitude}&lon=${query.longitude}&appid=${API_KEY}&units=metric`;
            console.log(`[API Call] Querying coords: Lat ${query.latitude}, Lon ${query.longitude}`);
        } else {
            url = `${WEATHER_API_URL}?q=${encodeURIComponent(query)}&appid=${API_KEY}&units=metric`;
            console.log(`[API Call] Querying city name: "${query}"`);
        }

        const response = await fetch(url);

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('Invalid OpenWeatherMap API Key. Make sure your key is active and correctly pasted.');
            } else if (response.status === 404) {
                // If live API returns 404, check mock data before erroring
                const mockData = checkMockFallback(query);
                if (mockData) {
                    activeWeatherData = mockData;
                    displayWeatherData(mockData);
                    addRecentCity(mockData.name);
                    return;
                }
                throw new Error(`Location "${query}" was not found by OpenWeatherMap API.`);
            }
            throw new Error(`OpenWeatherMap service responded with status: ${response.status}`);
        }

        const data = await response.json();

        // Parse OpenWeatherMap response schema into our standard state object
        activeWeatherData = {
            name: data.name || 'Local coordinate Zone',
            country: data.sys ? data.sys.country : 'LOC',
            latitude: data.coord.lat,
            longitude: data.coord.lon,
            temperature: data.main.temp,
            apparent_temperature: data.main.feels_like,
            weather_id: data.weather[0].id,
            relative_humidity: data.main.humidity,
            wind_speed: data.wind.speed * 3.6, // Convert m/s to km/h for metric standardization
            precipitation: data.rain ? (data.rain['1h'] || data.rain['3h'] || 0) : 0,
            description: data.weather[0].description
        };

        displayWeatherData(activeWeatherData);
        addRecentCity(activeWeatherData.name);

    } catch (error) {
        console.error(`[Weather App Error] ${error.message}`);
        showError('Weather Inquiry Failed', error.message);
    } finally {
        hideLoader();
    }
}

// ==========================================================================
// 9. RENDER DETAILS & INTERFACE WRITING
// ==========================================================================
function displayWeatherData(weather) {
    // 1. Text Details
    weatherCity.innerHTML = `${weather.name} <span class="country-badge" id="weather-country">${weather.country}</span>`;

    const latDir = weather.latitude >= 0 ? 'N' : 'S';
    const lonDir = weather.longitude >= 0 ? 'E' : 'W';
    weatherCoords.textContent = `Coordinates: ${Math.abs(weather.latitude).toFixed(4)}° ${latDir}, ${Math.abs(weather.longitude).toFixed(4)}° ${lonDir}`;

    // 2. Weather Code & Emoji mapping
    const condition = getConditionDetails(weather.weather_id);
    weatherIcon.textContent = condition.emoji;
    weatherDesc.textContent = weather.description;

    // 3. Clear existing weather class themes and insert matching dynamic theme
    weatherCard.className = 'glass-panel weather-card';
    weatherCard.classList.add(condition.theme);

    // 4. Update Temperature values & metrics based on active unit toggle
    updateTemperatureDisplay(weather);

    // 5. Grid Metrics
    valHumidity.textContent = `${weather.relative_humidity}%`;

    // Un-hide the weather presentation box
    weatherCard.classList.remove('hidden');
}

function updateTemperatureDisplay(weather) {
    if (!weather) return;

    if (currentUnit === 'C') {
        tempValue.textContent = weather.temperature.toFixed(1);
        tempUnitLabel.textContent = '°C';
        weatherFeels.textContent = `Feels like: ${weather.apparent_temperature.toFixed(1)}°C`;
        valWind.textContent = `${weather.wind_speed.toFixed(1)} km/h`;
        valPrecip.textContent = `${weather.precipitation.toFixed(1)} mm`;
    } else {
        const tempF = celsiusToFahrenheit(weather.temperature);
        const feelsF = celsiusToFahrenheit(weather.apparent_temperature);
        const windMiles = kmtomiles(weather.wind_speed);

        tempValue.textContent = tempF.toFixed(1);
        tempUnitLabel.textContent = '°F';
        weatherFeels.textContent = `Feels like: ${feelsF.toFixed(1)}°F`;
        valWind.textContent = `${windMiles.toFixed(1)} mph`;
        valPrecip.textContent = `${(weather.precipitation / 25.4).toFixed(2)} in`;
    }
}

// ==========================================================================
// 10. LOCAL MOCK INTERCEPTOR
// ==========================================================================
function checkMockFallback(city) {
    if (typeof city === 'object') return null; // Geo coordinate fallbacks are bypassed
    const key = city.trim().toLowerCase();
    if (mockWeatherDatabase[key]) {
        return { ...mockWeatherDatabase[key] };
    }
    return null;
}

// ==========================================================================
// 11. SYSTEM STATUS & STATES TOGGLE HELPERS
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

// Custom clear error
function hideError() {
    errorPanel.classList.add('hidden');
}

function hideWeatherCard() {
    weatherCard.classList.add('hidden');
}

// ==========================================================================
// 12. BROWSER GEOLOCATION API HANDLERS
// ==========================================================================
function handleGeolocation() {
    if (!navigator.geolocation) {
        showError('Geolocation Unsupported', 'Your browser does not support location retrieval. Search manually.');
        return;
    }

    geoBanner.classList.remove('hidden');
    hideError();
    hideWeatherCard();
    showLoader('Acquiring location satellite lock...');

    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            console.log(`[Geolocation Success] Acquired coordinates: Lat ${lat}, Lon ${lon}`);

            geoBanner.innerHTML = `<span>🟢 Location acquired: ${lat.toFixed(4)}°, ${lon.toFixed(4)}°</span>`;

            await fetchWeather({ latitude: lat, longitude: lon });

            setTimeout(() => geoBanner.classList.add('hidden'), 4000);
        },
        (error) => {
            console.error(`[Geolocation Error] ${error.message}`);
            hideLoader();
            geoBanner.classList.add('hidden');

            let message = 'Could not acquire user location.';
            if (error.code === error.PERMISSION_DENIED) {
                message = 'Access to geolocation denied. Please check your browser site permission configurations.';
            } else if (error.code === error.POSITION_UNAVAILABLE) {
                message = 'Network geolocation services unavailable.';
            } else if (error.code === error.TIMEOUT) {
                message = 'Geolocation query timed out.';
            }
            showError('Location Lock Failure', message);
        },
        { timeout: 8000, enableHighAccuracy: true }
    );
}

// ==========================================================================
// 13. EVENT LISTENERS REGISTER
// ==========================================================================

// Search Submit Event
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();
    if (city !== '') {
        fetchWeather(city);
        cityInput.value = '';
    }
});

// Geolocation Click Event
geoBtn.addEventListener('click', handleGeolocation);

// Metric toggling events
unitCBtn.addEventListener('click', () => {
    if (currentUnit === 'C') return;
    currentUnit = 'C';
    unitCBtn.classList.add('active');
    unitFBtn.classList.remove('active');
    updateTemperatureDisplay(activeWeatherData);
});

unitFBtn.addEventListener('click', () => {
    if (currentUnit === 'F') return;
    currentUnit = 'F';
    unitFBtn.classList.add('active');
    unitCBtn.classList.remove('active');
    updateTemperatureDisplay(activeWeatherData);
});

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
