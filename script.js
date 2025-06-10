const apiKey = '774fcb29b378a0667d4b6214d5b40ced';

const cityInput = document.getElementById('cityInput');
const getWeatherBtn = document.getElementById('getWeatherBtn');
const weatherResult = document.getElementById('weatherResult');
const cityName = document.getElementById('cityName');
const weatherIcon = document.getElementById('weatherIcon');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');
const errorMsg = document.getElementById('errorMsg');

getWeatherBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (!city) {
    showError('Please enter a city name');
    return;
  }
  fetchWeather(city);
});

// Allow Enter key to trigger fetch
cityInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    getWeatherBtn.click();
  }
});

function showError(msg) {
  errorMsg.style.display = 'block';
  errorMsg.textContent = msg;
  weatherResult.style.display = 'none';
}

function clearError() {
  errorMsg.style.display = 'none';
  errorMsg.textContent = '';
}

async function fetchWeather(city) {
  clearError();
  weatherResult.style.display = 'none';

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    city
  )}&appid=774fcb29b378a0667d4b6214d5b40ced&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      if (response.status === 404) {
        showError('City not found. Please check the city name.');
      } else {
        showError('Failed to fetch weather data. Please try again later.');
      }
      return;
    }

    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    showError('Network error. Please check your connection.');
  }
}

function displayWeather(data) {
  cityName.textContent = `${data.name}, ${data.sys.country}`;
  temperature.textContent = `${Math.round(data.main.temp)}°C`;
  description.textContent = data.weather[0].description
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  humidity.textContent = `${data.main.humidity}%`;
  windSpeed.textContent = `${data.wind.speed} m/s`;

  const iconCode = data.weather[0].icon;
  weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  weatherIcon.alt = data.weather[0].description;

  weatherResult.style.display = 'block';
}
