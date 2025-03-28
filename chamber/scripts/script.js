// Ensure DOM is fully loaded before running scripts
document.addEventListener("DOMContentLoaded", () => {
    updateYearAndLastModified();
    setupMobileNavigation();
    fetchDirectory();
    setupViewToggle();
    fetchWeather();
    fetchForecast();
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
        menuToggle.addEventListener("click", () => {
            menu.classList.toggle("active");
        });
    }
}

/* 🔹 Fetch and Display Directory Data */
async function fetchDirectory() {
    try {
        const response = await fetch("data/members.json");
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const members = await response.json();
        const directory = document.getElementById("directory");

        if (!members || members.length === 0) {
            directory.innerHTML = "<p>No members found.</p>";
            return;
        }

        directory.innerHTML = members
            .map(m => `
                <div class="directory-card">
                    <img src="${m.image}" alt="${m.name} Logo" loading="lazy">
                    <h3>${m.name}</h3>
                    <p>${m.phone}</p>
                    <a href="${m.website}" target="_blank" rel="noopener noreferrer">Visit Website</a>
                </div>
            `)
            .join("");
    } catch (error) {
        console.error("Error fetching directory:", error);
        document.getElementById("directory").innerHTML = "<p>Failed to load directory data.</p>";
    }
}

/* 🔹 Toggle Grid/List View */
function setupViewToggle() {
    const toggleButton = document.getElementById("toggleView");
    const directory = document.getElementById("directory");

    if (toggleButton && directory) {
        toggleButton.addEventListener("click", () => {
            directory.classList.toggle("list-view");
        });
    }
}

/* 🔹 Fetch Weather Data */
async function fetchWeather() {
    const apiKey = "50f96054d10a4e83f3d1105608e49449"; // Replace with a valid API key
    const city = "Sugar City";
    const country = "US";
    const weatherElement = document.getElementById("weather");

    if (!weatherElement) return;

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=imperial`
        );

        if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

        const data = await response.json();
        weatherElement.innerHTML = `
            <p>🌡️ ${Math.round(data.main.temp)}°F - ${data.weather[0].description}</p>
        `;
    } catch (error) {
        console.error("Weather fetch error:", error);
        weatherElement.innerHTML = "Weather data unavailable";
    }
}

/* 🔹 Fetch Weather Forecast */
async function fetchForecast() {
    const apiKey = "50f96054d10a4e83f3d1105608e49449"; // Replace with a valid API key
    const city = "Sugar City";
    const country = "US";
    const forecastElement = document.getElementById("weather-forecast");

    if (!forecastElement) return;

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${apiKey}&units=imperial`
        );

        if (!response.ok) throw new Error("Failed to load forecast");

        const data = await response.json();

        // Extract three different time periods for the forecast
        const forecastText = `
            ${Math.round(data.list[8]?.main.temp || "N/A")}°F, 
            ${Math.round(data.list[16]?.main.temp || "N/A")}°F, 
            ${Math.round(data.list[24]?.main.temp || "N/A")}°F
        `;
        forecastElement.textContent = forecastText;
    } catch (error) {
        console.error("Forecast fetch error:", error);
        forecastElement.textContent = "Forecast unavailable";
    }
}
