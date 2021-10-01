const searchButton = document.querySelector('#search-btn');
const conversionButton = document.querySelector('#conversion-btn');
const searchBar = document.querySelector('#search-bar');
const station = document.querySelector('#location-info');
const temperature = document.querySelector('#temperature-info');
const weather = document.querySelector('#weather-info');
const img = document.querySelector('img');

const fetchWeather = async (city) => {
    try {
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=d396e732e26fc8250e814ba390886903`, {mode: 'cors'})
        const responseWeather = await response.json();
        
        console.log(responseWeather);

        const currentLocation = populateLocation(responseWeather)
        updateDOM(currentLocation);

    } catch (error) {
        alert('Nothing found, please try again');
        console.log(error)
    };
}

const createLocation = (city, temp, sky, image) => {
    return {
        city,
        temp,
        sky,
        image,
    }
}

const populateLocation = (currentWeather) => {
    const currentCity = currentWeather.name;
    const currentTemp = currentWeather.main.temp;
    const currentSky = currentWeather.weather[0].main;
    const currentImage = currentWeather.weather[0].icon;
    
    return createLocation(currentCity, currentTemp, currentSky, currentImage);
}

const updateDOM = (information) => {
    station.textContent = information.city;
    temperature.textContent = chooseConversion(information.temp);
    weather.textContent = information.sky;
    img.src = `http://openweathermap.org/img/wn/${information.image}@2x.png`;
}

const convertKtoF = (number) => {
    const fahrenheit = (number - 273.15) * (9 / 5) + 32
    return fahrenheit.toFixed(0) + '\xB0 F';
}

const convertKtoC = (number) => {
    const celsius = (number - 273.15)
    return celsius.toFixed(0) + '\xB0 C';;
}

const chooseConversion = (number) => {
    if (conversionButton.textContent === 'Celcius') {
        return convertKtoC(number)
    } else {
        return convertKtoF(number)
    }
}

const chooseImage = (image) => {
    
}

searchButton.addEventListener('click', () => {
    let searchInput = searchBar.value;
    if (!searchInput) {
        searchInput = 'Fort Collins, US';
    }
    fetchWeather(searchInput);
});

conversionButton.addEventListener('click', () => {
    if (conversionButton.textContent === 'Celcius') {
        conversionButton.textContent = 'Farenhiet'
    } else {
        conversionButton.textContent = 'Celcius'
    }

    let searchInput = searchBar.value;
    if (!searchInput) {
        searchInput = 'Fort Collins, US';
    }
    fetchWeather(searchInput);
})

fetchWeather('Fort Collins, US');
