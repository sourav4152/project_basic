# 🌦️ Weather App

A responsive and interactive Weather App built using **HTML**, **CSS**, and **JavaScript**.  
It provides real-time weather data based on your location or a searched city using the **OpenWeatherMap API**.

## 🔗 Live Preview

👉 [Click here to view live](https://htmlpreview.github.io/?https://github.com/sourav4152/project_basic/blob/main/current%20weather/index.html) 

---

## 📌 Features

### 🔍 Weather Search Options
- **Your Weather**: Detects user's location using the **Geolocation API** and shows current weather info.
- **Search Weather**: Allows users to search weather details by entering any city name.

### 📍 Geolocation Support
- Uses the browser's **Geolocation API** to fetch user coordinates.
- Saves user coordinates in **Session Storage** to avoid repeated permission prompts.

### 🌐 Real-Time API Integration
- Fetches live weather data using **OpenWeatherMap API**.
- Retrieves:
  - Temperature (converted from Kelvin to Celsius)
  - Wind speed
  - Humidity
  - Cloudiness
  - Weather condition icon
  - Country flag based on city

### ⚙️ Interactive UI
- **Tab Switching**: Switch between "Your Weather" and "Search Weather".
- **Loading Animation**: Displays a loader while fetching API data.
- **Error Handling**: Shows a "City Not Found" image and message for invalid inputs.
- **Responsive Layout**: Mobile-friendly design using media queries.

### 🎨 Design Highlights
- Smooth gradient background using CSS custom properties.
- Clean, minimal card-style layout for weather parameters.
- Hover effects on buttons and input fields.
- Uses **Merriweather Sans** Google font for modern typography.

---

## 🧩 Tech Stack

- **HTML5** – Structure
- **CSS3** – Styling and responsiveness
- **JavaScript (Vanilla)** – Logic and API interaction
- **OpenWeatherMap API** – Real-time weather data
- **Session Storage** – Store user location
- **Geolocation API** – Get user coordinates

---


```bash
weather-app/
│
├── index.html           # Main HTML file
├── style.css            # Styling and media queries
├── script.js            # Core JavaScript logic
└── Images/              # All icons/images used
```

## 🧪 How to Use

1. Clone or download the repository.
2. Open `index.html` in a browser.
3. Grant location access to get your current weather.
4. Or search for any city using the input bar.


## 🙌 Acknowledgments

 - [OpenWeatherMap API](https://openweathermap.org/api)

 - [FlagCDN for country flags](https://flagcdn.com/)

 - [Google Fonts – Merriweather Sans](https://fonts.google.com/specimen/Merriweather+Sans)


## 📝 License

This project is created for learning purposes and is not licensed.
