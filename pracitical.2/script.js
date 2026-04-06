const WEATHER_API_KEY = '288ff438394c88d8f1742b69f9776de9';
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const PLACEHOLDER_API_URL = 'https://jsonplaceholder.typicode.com/posts';

let savedLocations = [];

document.addEventListener('DOMContentLoaded', () => {

    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tab');

            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });

            // ✅ FIXED (added backticks)
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });

    document.getElementById('get-weather').addEventListener('click', getWeather);
    document.getElementById('save-location').addEventListener('click', saveLocation);

    document.getElementById('update-location').addEventListener('click', updateLocation);
    document.getElementById('cancel-edit').addEventListener('click', () => {
        document.getElementById('edit-modal').style.display = 'none';
    });

    fetchSavedLocations();
});


function displayResponseInfo(method, url, status, data) {
    const responseInfo = document.getElementById('response-info');
    responseInfo.textContent = `Method: ${method}
URL: ${url}
Status: ${status}
Timestamp: ${new Date().toLocaleString()}
Data: ${JSON.stringify(data, null, 2)}`;
}


async function getWeather() {
    const city = document.getElementById('city-input').value.trim();

    if (!city) {
        alert('Please enter a city name');
        return;
    }

    const weatherResult = document.getElementById('weather-result');
    weatherResult.innerHTML = 'Loading...';

    try {
        // ✅ FIXED (added backticks)
        const url = `${WEATHER_API_URL}?q=${encodeURIComponent(city)}&units=metric&appid=${WEATHER_API_KEY}`;

        const response = await fetch(url);
        const data = await response.json();

        displayResponseInfo('GET', url.replace(WEATHER_API_KEY, 'API_KEY_HIDDEN'), response.status, data);

        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch weather data');
        }

        weatherResult.innerHTML = `
            <div class="weather-card">
                <div><strong>${data.name}, ${data.sys.country}</strong></div>
                <div><strong>Weather:</strong> ${data.weather[0].main} - ${data.weather[0].description}</div>
                <div><strong>Temperature:</strong> ${data.main.temp}°C (Feels like: ${data.main.feels_like}°C)</div>
                <div><strong>Humidity:</strong> ${data.main.humidity}%</div>
                <div><strong>Wind:</strong> ${data.wind.speed} m/s</div>
            </div>
            <button id="quick-save" style="background-color:#27ae60;">Save This Location</button>
        `;

        // ✅ FIXED (template strings)
        document.getElementById('quick-save').addEventListener('click', () => {
            document.getElementById('location-name').value = `Weather in ${data.name}`;
            document.getElementById('location-city').value = data.name;
            document.getElementById('location-country').value = data.sys.country;
            document.getElementById('location-notes').value =
                `Temp: ${data.main.temp}°C, Weather: ${data.weather[0].description}`;

            document.querySelector('.tab[data-tab="post"]').click();
        });

    } catch (error) {
        weatherResult.innerHTML = `
            <div class="weather-card" style="border-left-color:#e74c3c;">
                <h3>Error</h3>
                <p>${error.message}</p>
            </div>
        `;
    }
}


async function saveLocation() {
    const name = document.getElementById('location-name').value.trim();
    const city = document.getElementById('location-city').value.trim();
    const country = document.getElementById('location-country').value.trim();
    const notes = document.getElementById('location-notes').value.trim();

    if (!name || !city) {
        alert('Please enter at least a name and city');
        return;
    }

    try {
        const locationData = {
            title: name,
            body: JSON.stringify({ city, country, notes }),
            userId: 1
        };

        const response = await fetch(PLACEHOLDER_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(locationData)
        });

        const data = await response.json();

        displayResponseInfo('POST', PLACEHOLDER_API_URL, response.status, data);

        if (!response.ok) throw new Error('Failed to save location');

        savedLocations.push({
            id: data.id,
            name,
            city,
            country,
            notes
        });

        renderSavedLocations();

    } catch (error) {
        alert(`Error: ${error.message}`); // ✅ FIXED
    }
}


async function fetchSavedLocations() {
    try {
        const response = await fetch(`${PLACEHOLDER_API_URL}?userId=1`); // ✅ FIXED
        const data = await response.json();

        savedLocations = data.slice(0, 5).map(item => {
            let city = '', country = '', notes = '';

            try {
                const body = JSON.parse(item.body);
                city = body.city || 'Unknown City';
                country = body.country || '';
                notes = body.notes || '';
            } catch {
                city = 'Unknown City';
                notes = item.body;
            }

            return {
                id: item.id,
                name: item.title,
                city,
                country,
                notes
            };
        });

        renderSavedLocations();

    } catch (error) {
        console.error(error);
    }
}


function renderSavedLocations() {
    const container = document.getElementById('saved-locations');

    container.innerHTML = savedLocations.map(location => `
        <div class="location-item">
            <h3>${location.name}</h3>
            <div><strong>City:</strong> ${location.city}</div>
            ${location.country ? `<div><strong>Country:</strong> ${location.country}</div>` : ''}
            ${location.notes ? `<div><strong>Notes:</strong> ${location.notes}</div>` : ''}
        </div>
    `).join('');
}