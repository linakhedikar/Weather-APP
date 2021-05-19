// 43158b8a75b3f8575c9f54454df6d59c  API key
//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

const weatherApi = {
    key: "43158b8a75b3f8575c9f54454df6d59c",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather", 
}

const searchInputBox = document.getElementById('input-box');

// Event Listener Function on keypress
searchInputBox.addEventListener('keypress', (event) => {

    if(event.keyCode == 13) {
        console.log(searchInputBox.value);
        getWeatherReport(searchInputBox.value);
        document.querySelector('.weather-body').style.display = "block";
    }

});

// Get Weather Report
function getWeatherReport(city) {
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
    .then(weather => {
        return weather.json();
    }).then(showWeatherReport);
}

// Show Weather Report
function showWeatherReport(weather){
    console.log(weather);

    let city = document.getElementById('city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let temperature = document.getElementById('temp');
    temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

    let minMaxTemp = document.getElementById('min-max');
    minMaxTemp.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C (min) | ${Math.ceil(weather.main.temp_max)}&deg;C (max) `;

    let weatherType = document.getElementById('weather');
    weatherType.innerText = `${weather.weather[0].main}`;

    let date = document.getElementById('date');
    let todayDate = new Date();
    date.innerText = dateManage(todayDate);


    if(weatherType.textContent == 'Clear') {
        document.body.style.backgroundImage = "url('img/clear1.jpg')";

    } else if(weatherType.textContent == 'Clouds') {

        document.body.style.backgroundImage = "url('img/cloudy.jpg')";

    } else if(weatherType.textContent == 'Haze') {

        document.body.style.backgroundImage = "url('img/cloudy1.jpg')";

    }     else if(weatherType.textContent == 'Rain') {

        document.body.style.backgroundImage = "url('img/rainy.jpg')";

    } else if(weatherType.textContent == 'Snow') {

        document.body.style.backgroundImage = "url('img\snow.jpg')";

    } else if(weatherType.textContent == 'Thunderstorm') {

        document.body.style.backgroundImage = "url('img/thunderstorm.jpg')";

    } 
    else{
        document.body.style.backgroundImage = "url('img/sunny.jpg')"; 
    }
}

// Date manage
function dateManage(dateArg) {

    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];
    let hr = dateArg.getHours();
    let min = dateArg.getMinutes();  
    let periods = "AM" ;
    if (hr > 11){
       periods = "PM" ;
       if(hr > 12) hr -= 12;
    }
    if(min < 10){
        min = "0" + min;

    }

    return ` ${day}, ${date} ${month} ${year} | ${hr}:${min} ${periods}`;
}

