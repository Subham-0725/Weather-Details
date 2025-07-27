// Wait until the full HTML document is loaded before running the script
document.addEventListener("DOMContentLoaded", () => {
  // Get references to all necessary DOM elements
  const cityInput = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityNameDisplay = document.getElementById("city-name");
  const temperatureDisplay = document.getElementById("temperature");
  const descriptionDisplay = document.getElementById("description");
  const errorMessage = document.getElementById("error-message");

  // OpenWeatherMap API key
  const API_KEY = "8b61dee2cc9b68c885cb4ae2b6b2972b";

  // Add click event listener to the "Get Weather" button
  getWeatherBtn.addEventListener("click", async () => {
    // Get the city name input by the user, removing any leading/trailing spaces
    const city = cityInput.value.trim();
    if (!city) return; // Exit if input is empty

    try {
      // Try fetching weather data for the input city
      const weatherData = await fetchWeatherData(city);
      // If successful, display the weather data
      displayWeatherData(weatherData);
    } catch (error) {
      // If any error occurs (e.g., city not found), show error message
      showError();
    }
  });

  // Async function to fetch weather data from OpenWeatherMap API
  async function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    const response = await fetch(url); // Send GET request to API
    console.log("RESPONSE", response); // Log raw response (for debugging)

    if (!response.ok) {
      // If HTTP response is not successful, throw error
      throw new Error("City Not Found");
    }

    const data = await response.json(); // Convert response to JSON
    return data; // Return the parsed data
  }

  // Function to display weather data on the page
  function displayWeatherData(data) {
    console.log(data); // Log the actual weather data (for debugging)

    // Destructure needed data
    const { name, main, weather } = data;

    // Populate the DOM with weather data
    cityNameDisplay.innerHTML = name;
    temperatureDisplay.innerHTML = `Temperature : ${main.temp}`;
    descriptionDisplay.innerHTML = `Weather : ${weather[0].description}`;

    // Show the weather info section and hide any previous error message
    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");
  }

  // Function to show error state
  function showError() {
    // Show weather section even if it's error (may be for consistent layout)
    weatherInfo.classList.remove("hidden");
    // Show the error message
    errorMessage.classList.add("hidden");
  }
});
