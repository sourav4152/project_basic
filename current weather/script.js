const userTab = document.querySelector("[data-userWeather]");
const userSearch = document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector("[weatherContainer]");

const grantAccessContainer = document.querySelector(".grant-location-container");
const searchForm = document.querySelector("[data-searchForm]");
const loadingScreen = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-info-container");

const notFount = document.querySelector("[data-notFound]");

//initial vaviables need?

let currentTab = userTab;
const API_KEY = "e518319d90a432924f50038a4f0e22d2";
currentTab.classList.add("current-tab");
getfromSessionStorage();

// function to swithch tab 
function switchTab(clickedTab) {
    if (clickedTab != currentTab) {
        currentTab.classList.remove("current-tab");
        currentTab = clickedTab;
        currentTab.classList.add("current-tab");
        notFount.classList.remove("active");

        if (!searchForm.classList.contains("active")) {
            userInfoContainer.classList.remove("active");
            grantAccessContainer.classList.remove("active");
            searchForm.classList.add("active");
        }
        else {
            searchForm.classList.remove("active");
            userInfoContainer.classList.remove("active");
            getfromSessionStorage();
        }
    }



}
userTab.addEventListener("click", () => {
    switchTab(userTab);
});

userSearch.addEventListener("click", () => {
    switchTab(userSearch);
});

//check if we have user current location present in storage or not
function getfromSessionStorage() {

    const localCoordinates = sessionStorage.getItem("user-coordinates");
    if (!localCoordinates) {
        //not avilable 
        grantAccessContainer.classList.add("active");
    }
    else {
        const coordinates = JSON.parse(localCoordinates);
        // console.log("User coordinates:", coordinates);      //to check if coordinates are being fetched correctly
        feachUserWeatherInfo(coordinates);
    }

}


async function feachUserWeatherInfo(coordinates) {

    const { lat, lon } = coordinates;
    //makeing  grant container invisible
    grantAccessContainer.classList.remove("active");
    //loding page
    loadingScreen.classList.add("active");

    // API CALL 
    try {
        const responce = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
        const data = await responce.json();
        // You can now use 'data' as needed
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);

    } catch (err) {
        // Handle error yourself
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.remove("active");
    }

}


function renderWeatherInfo(weatherInfo) {
    const cityName = document.querySelector("[data-cityName]");
    const countryIcon = document.querySelector("[data-countryIcon]");
    const desc = document.querySelector("[data-weatherDesc]");
    const weatherIcon = document.querySelector("[data-weatherIcon]");
    const temp = document.querySelector("[ data-temp]");
    const windspeed = document.querySelector("[data-windspeed]");
    const humidity = document.querySelector("[data-humidity]");
    const cloudiness = document.querySelector("[data-cloudiness]");

    //

    cityName.innerText = weatherInfo?.name;
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    desc.innerText = weatherInfo?.weather?.[0]?.description;
    weatherIcon.src = `https://openweathermap.org/img/wn/${weatherInfo.weather?.[0]?.icon}.png `;
    // temp.innerText = `${weatherInfo?.main?.temp ?? 0} kelvin`;
    temp.innerText = `${Math.floor(weatherInfo?.main?.temp - 273.15)}` + " °C";
    windspeed.innerText = `${weatherInfo?.wind?.speed}` + " m/s";
    humidity.innerText = `${weatherInfo?.main?.humidity}` + " %";
    cloudiness.innerText = `${weatherInfo?.clouds?.all}` + " %";
   
    // console.log("Coordinates:", weatherInfo?.coord);    // Print coordinates in console
}

// grant access listener
const grantAccessButton = document.querySelector("[data-grantAccess]");
grantAccessButton.addEventListener("click", getLocation);

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
        // handle error
        alert("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    const userContainer = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    }
    sessionStorage.setItem("user-coordinates", JSON.stringify(userContainer));
    feachUserWeatherInfo(userContainer);
}


//search form API CALL

let searchInput = document.querySelector("[data-searchInput]");

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let cityName = searchInput.value;

    if (cityName === "") return;

    else {
        feachSearchWeatherInfo(cityName);
    }
});

async function feachSearchWeatherInfo(city) {

    loadingScreen.classList.add("active");
    notFount.classList.remove("active");
    userInfoContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");


    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    } catch (err) {
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.remove("active");
        notFount.classList.add("active");
    }


}