// Update Year & Last Modified Date 
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// Mobile Navigation Toggle
document.getElementById("menu-toggle").addEventListener("click", () => {
    const menu = document.getElementById("menu");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
});

// Fetch Directory Data
async function fetchDirectory() {
    try {
        const response = await fetch("data/members.json");
        if (!response.ok) throw new Error("Failed to load members.json");
        const members = await response.json();
        const directory = document.getElementById("directory");

        directory.innerHTML = members.map(m => `
            <div class="directory-card">
                <img src="${m.image}" alt="${m.name} Logo">
                <h3>${m.name}</h3>
                <p>${m.phone}</p>
                <a href="${m.website}" target="_blank">Visit Website</a>
            </div>
        `).join("");
    } catch (error) {
        console.error("Error fetching directory:", error);
        document.getElementById("directory").innerHTML = "<p>Failed to load directory data.</p>";
    }
}
fetchDirectory();

// Toggle Grid/List View
document.getElementById("toggleView").addEventListener("click", () => {
    document.getElementById("directory").classList.toggle("list-view");
});

// Fetch Weather Data
document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "YOUR_API_KEY"; // Replace with your actual OpenWeatherMap API key
    const city = "Sugar City"; // Change to your chamber location
    const country = "US"; // Adjust if necessary

    async function fetchWeather() {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=imperial`
            );
            const data = await response.json();

            if (response.ok) {
                document.getElementById("weather-description").textContent =
                    data.weather[0].description.toUpperCase();
                document.getElementById("weather-temp").textContent = `${Math.round(data.main.temp)}°F`;
                fetchForecast();
            } else {
                document.getElementById("weather-description").textContent =
                    "Weather data unavailable";
            }
        } catch (error) {
            console.error("Weather fetch error:", error);
            document.getElementById("weather-description").textContent =
                "Unable to retrieve weather";
        }
    }

    async function fetchForecast() {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${apiKey}&units=imperial`
            );
            const data = await response.json();

            if (response.ok) {
                const forecastText = `${Math.round(data.list[8].main.temp)}°F, 
                                      ${Math.round(data.list[16].main.temp)}°F, 
                                      ${Math.round(data.list[24].main.temp)}°F`;
                document.getElementById("weather-forecast").textContent = forecastText;
            }
        } catch (error) {
            console.error("Forecast fetch error:", error);
            document.getElementById("weather-forecast").textContent =
                "Forecast unavailable";
        }
    }

    fetchWeather();
});
