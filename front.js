const apiKey = "54014ff41a9e7fa3bb17b8796eeff71e";

      const searchInput = document.querySelector(".search input");
      const searchBtn = document.querySelector(".searchbutton");
      const weatherIcon = document.querySelector(".icon1");
      const weatherSection = document.querySelector(".weather");
      const errorMsg = document.querySelector(".error-message");
      const locationToggle = document.getElementById("useLocation");

      async function checkWeather(city) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        try {
          const response = await fetch(apiUrl);
          if (!response.ok) {
            throw new Error("City not found");
          }

          const data = await response.json();
          console.log(data);

          document.querySelector(".city").innerHTML = data.name;
          document.querySelector(".temp").innerHTML =
            Math.round(data.main.temp) + "°c";
          document.querySelector(".humidity").innerHTML =
            data.main.humidity + "%";
          document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

          const condition = data.weather[0].main;

          switch (condition) {
            case "Clouds":
              weatherIcon.src = "cloudy.png";
              break;
            case "Rain":
              weatherIcon.src = "rain-icon.webp";
              break;
            case "Drizzle":
              weatherIcon.src = "drizzle.webp";
              break;
            case "Mist":
              weatherIcon.src = "Mist.png";
              break;
            case "Clear":
              weatherIcon.src = "weather-icon.webp";
              break;
            default:
              weatherIcon.src = "default.png";
          }

          weatherSection.classList.remove("hidden");
          errorMsg.classList.add("hidden");
        } catch (error) {
          weatherSection.classList.add("hidden");
          errorMsg.classList.remove("hidden");
        }
      }

      // Use IP-based geolocation for getting the location
      async function fetchWeatherByIP() {
        try {
          // Replace with your actual ipinfo API token
          const response = await fetch(
            "https://ipinfo.io/json?token=9715195e654a78"
          );
          const data = await response.json();
          const [lat, lon] = data.loc.split(","); // Extract latitude and longitude

          console.log("IP-based Latitude:", lat);
          console.log("IP-based Longitude:", lon);

          const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

          const weatherResponse = await fetch(apiUrl);
          if (!weatherResponse.ok) {
            throw new Error("Unable to fetch weather by IP location");
          }

          const weatherData = await weatherResponse.json();
          updateWeatherUI(weatherData);
        } catch (error) {
          console.error(error);
          alert("Failed to fetch weather based on IP location.");
        }
      }

      function updateWeatherUI(data) {
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML =
          Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML =
          data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

        const condition = data.weather[0].main;
        switch (condition) {
          case "Clouds":
            weatherIcon.src = "cloudy.png";
            break;
          case "Rain":
            weatherIcon.src = "rain-icon.webp";
            break;
          case "Drizzle":
            weatherIcon.src = "drizzle.webp";
            break;
          case "Mist":
            weatherIcon.src = "Mist.png";
            break;
          case "Clear":
            weatherIcon.src = "weather-icon.webp";
            break;
          default:
            weatherIcon.src = "default.png";
        }

        weatherSection.classList.remove("hidden");
        errorMsg.classList.add("hidden");
      }

      function handleSearch() {
        const city = searchInput.value.trim();
        if (city !== "") {
          checkWeather(city);
        }
      }

      // Event listener for the search button
      searchBtn.addEventListener("click", handleSearch);

      // Event listener for Enter key press in the input field
      searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          handleSearch();
        }
      });

      // Event listener for location toggle change
      locationToggle.addEventListener("change", function () {
        if (this.checked) {
          fetchWeatherByIP(); // Use IP-based geolocation to get weather
        } else {
          weatherSection.classList.add("hidden");
          errorMsg.classList.add("hidden");
        }
      });

      // Fetch weather based on IP when the page loads
      fetchWeatherByIP();
