// Ensure DOM is fully loaded before running scripts
document.addEventListener("DOMContentLoaded", () => {
    updateYearAndLastModified();
    setupMobileNavigation();
    fetchDirectory();
    setupViewToggle();
    fetchWeatherData();
});

/* 🔹 Update Year & Last Modified Date */
function updateYearAndLastModified() {
    document.getElementById("year").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = document.lastModified;
}

/* 🔹 Mobile Navigation Toggle */
function setupMobileNavigation() {
    const menuToggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("menu");

    if (menuToggle && menu) {
        menuToggle.addEventListener("click", () => menu.classList.toggle("active"));
    }
}

/* 🔹 Fetch and Display Directory Data */
async function fetchDirectory() {
    const directory = document.getElementById("directory");
    if (!directory) return;

    try {
        const response = await fetch("data/members.json");
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const members = await response.json();
        if (!members.length) {
            directory.innerHTML = "<p>No members found.</p>";
            return;
        }

        directory.innerHTML = members.map(member => `
            <div class="directory-card">
                <img src="${member.image}" alt="${member.name} Logo" loading="lazy">
                <h3>${member.name}</h3>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit Website</a>
            </div>
        `).join("");

    } catch (error) {
        console.error("Error fetching directory:", error);
        directory.innerHTML = "<p>Failed to load directory data.</p>";
    }
}

/* 🔹 Toggle Grid/List View */
function setupViewToggle() {
    const toggleButton = document.getElementById("toggleView");
    const directory = document.getElementById("directory");

    if (toggleButton && directory) {
        toggleButton.addEventListener("click", () => directory.classList.toggle("list-view"));
    }
}

/* 🔹 Fetch Weather & 3-Day Forecast */
async function fetchWeatherData() {
    const apiKey = "50f96054d10a4e83f3d1105608e49449"; // Replace with a valid API key
    const city = "Sugar City";
    const country = "US";

    const weatherElement = document.getElementById("weather-description");
    const tempElement = document.getElementById("weather-temp");
    const forecastElement = document.getElementById("weather-forecast");

    if (!weatherElement || !tempElement || !forecastElement) return;

    try {
        const [weatherResponse, forecastResponse] = await Promise.all([
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=imperial`),
            fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${apiKey}&units=imperial`)
        ]);

        if (!weatherResponse.ok || !forecastResponse.ok) throw new Error("Failed to load weather data");

        const weatherData = await weatherResponse.json();
        const forecastData = await forecastResponse.json();

        // Display current weather
        weatherElement.textContent = weatherData.weather[0].description;
        tempElement.textContent = `${Math.round(weatherData.main.temp)}°F`;

        // Extract three full-day forecasts with actual day names
        const dailyForecast = getThreeDayForecast(forecastData.list);
        forecastElement.innerHTML = dailyForecast.map(({ day, temp }) => 
            `<p><strong>${day}:</strong> ${temp}°F</p>`
        ).join("");

    } catch (error) {
        console.error("Weather fetch error:", error);
        weatherElement.textContent = "Weather data unavailable";
        forecastElement.innerHTML = "<p>Forecast unavailable</p>";
    }
}

/* 🔹 Helper Function: Extract Three-Day Forecast */
function getThreeDayForecast(forecastList) {
    const dailyTemps = [];
    const daysSet = new Set();
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    for (let forecast of forecastList) {
        const forecastDate = new Date(forecast.dt_txt);
        const dayName = daysOfWeek[forecastDate.getDay()];

        if (!daysSet.has(dayName)) {
            dailyTemps.push({ day: dayName, temp: Math.round(forecast.main.temp) });
            daysSet.add(dayName);
        }

        if (dailyTemps.length === 3) break; // Stop when we have 3 future days
    }

    return dailyTemps.length === 3 ? dailyTemps : [{ day: "N/A", temp: "N/A" }];
}
