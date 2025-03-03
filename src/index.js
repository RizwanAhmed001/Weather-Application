// https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid={API key}
let userInput = document.getElementById("userInput");
let searchBtn = document.getElementById("searchBtn");
let locationBtn = document.getElementById("locationBtn");
let todayWeatherDiv = document.getElementById("currrentWeatherValues");
let forcastDiv = document.getElementById("forcastContainer");
let errorMsg = document.getElementById("error");
const apiKey = "056e78e6d023aca3f722c765b5db0a83";

function getForcastDays(name, days, index) {
  if (index === 0) {
    return `<div id="currrentWeatherValues" class="flex flex-col w-full justify-center gap-3  p-2 items-center">

                    <div id="cityDiv" class="bg-slate-800 flex justify-around items-center h-[20vh] rounded-2xl hover:bg-blue-400 w-full">
                        <h3 class="font-bold text-2xl">City:</h3>
                        <h3 id="city" class="text-3xl">${name}</h3>
                    </div>

                    <div id="dateDiv" class="bg-slate-800 w-full h-[20vh] flex items-center justify-around rounded-2xl hover:bg-blue-400">
                        <h3 class="font-bold text-2xl">Date:</h3>
                        <h3 id="date" class="text-3xl">${
                          days.dt_txt.split(" ")[0]
                        }</h3>
                    </div>

                    <div id="temperatureDiv" class="bg-slate-800 w-full h-[20vh] flex items-center justify-around rounded-2xl hover:bg-blue-400">
                        <h3 class="font-bold text-2xl"><i class="fa-solid fa-temperature-three-quarters text-red-400 text-3xl"></i> Temp</h3>
                        <h3 id="temperature" class="text-3xl">${(
                          days.main.temp - 273.15
                        ).toFixed(2)} &deg;C</h3>
                    </div>

                    <div id="weatherIconDiv" class="bg-slate-800 w-full h-[20vh] flex  items-center justify-around rounded-2xl hover:bg-blue-400 ">
                        <img class="h-[18vh] " id="currentweatherIcon" src="https://openweathermap.org/img/wn/${
                          days.weather[0].icon
                        }@4x.png" alt="Weather">
                        <h3 id="WeatherText" class="text-3xl">${
                          days.weather[0].description
                        }</h3>
                    </div>

                    <div id="humidityDiv" class="bg-slate-800 w-full h-[20vh] flex  items-center justify-around rounded-2xl hover:bg-blue-400">
                        <h3 class="font-bold text-2xl"><i class="fa-solid fa-droplet text-blue-300 text-3xl"></i> Humidity:</h3>
                        <h3 id="humidity" class="text-3xl">${
                          days.main.humidity
                        } %</h3>
                    </div>

                    <div id="windDiv" class="bg-slate-800 w-full h-[20vh] flex items-center justify-around rounded-2xl hover:bg-blue-400">
                        <h3 class="font-bold text-2xl"><i class="fa-solid fa-wind text-sky-200 text-3xl"></i> Wind:</h3>
                        <h3 id="wind" class="text-3xl">${
                          days.wind.speed
                        }  M/S</h3>
                    </div>
                    <div id="sunriseDiv" class="bg-slate-800 w-full h-[20vh] flex items-center justify-around rounded-2xl hover:bg-blue-400">
                        <h3 class="font-bold text-2xl"><i class="fa-solid fa-wind text-3xl text-blue-700"></i> Gust:</h3>
                        <h3 id="sunrise" class="text-3xl">${
                          days.wind.gust
                        } M/S</h3>
                    </div>
                    <div id="sunsetDiv" class="bg-slate-800 w-full h-[20vh] flex items-center justify-around rounded-2xl hover:bg-blue-400">
                        <h3 class="font-bold text-2xl"><i class="fa-solid fa-volcano text-3xl text-red-300 "></i> Pressure:</h3>
                        <h3 id="sunset" class="text-3xl">${
                          days.main.pressure
                        } hPa</h3>
                    </div>
        </div>`;
  } else {
    return `<div id="day1" class="p-3 flex flex-col mt-[5px] mb-[5px] bg-slate-800  rounded-2xl w-full hover:bg-blue-400">

                        <h3 id="fdate1" class="text-[1.25rem]">${
                          days.dt_txt.split(" ")[0]
                        }</h3>

                        <img src="https://openweathermap.org/img/wn/${
                          days.weather[0].icon
                        }@4x.png" alt="Weather" class="h-[20vh] w-[50%]">

                        <div id="temp1" class="text-[1.1rem] mt-[5px] mb-[5px]"><i class="fa-solid fa-temperature-three-quarters text-red-500"></i> Temp:  <span id="stemp1">${(
                          days.main.temp - 273.15
                        ).toFixed(2)}</span> &deg;C</div>

                        <div id="wind1" class="text-[1.1rem] mt-[5px] mb-[5px]"><i class="fa-solid fa-wind text-blue-600"></i> Wind:  <span id="swind1">${
                          days.wind.speed
                        }</span> M/S</div>

                        <div id="humidity1" class="text-[1.1rem] mt-[5px] mb-[5px]"><i class="fa-solid fa-droplet text-blue-700"></i> Humidity:  <span id="shumidity1">${
                          days.main.humidity
                        }</span> %</div>

                    </div>`;
  }
}

function getweatherUpdates(name, lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      let forecastDays = [];
      let forecast = data.list.filter((items) => {
        let forcastDay = new Date(items.dt_txt).getDate();
        if (!forecastDays.includes(forcastDay)) {
          return forecastDays.push(forcastDay);
        }
      });
      userInput.value = "";
      todayWeatherDiv.innerHTML = "";
      forcastDiv.innerHTML = "";

      forecast.forEach((days, index) => {
        if (index === 0) {
          todayWeatherDiv.insertAdjacentHTML(
            "beforeend",
            getForcastDays(name, days, index)
          );
        } else {
          forcastDiv.insertAdjacentHTML(
            "beforeend",
            getForcastDays(name, days, index)
          );
        }
      });
    })
    .catch(() => {
      errorMsg.classList.toggle("hidden");
      errorMsg.innerHTML = "Some error while fetching data..";
      setTimeout(() => {
        errorMsg.classList.toggle("hidden");
        userInput.value = "";
      }, 1000);
    });
}

function getUserLocation() {
  let uservalue = userInput.value.trim();
  if (!uservalue);
  let fetchData = `http://api.openweathermap.org/geo/1.0/direct?q=${uservalue}&limit=5&appid=${apiKey}`;

  fetch(fetchData)
    .then((response) => response.json())
    .then((data) => {
      const { name, lat, lon } = data[0];
      getweatherUpdates(name, lat, lon);
    })
    .catch(() => {
      errorMsg.classList.toggle("hidden");
      errorMsg.innerHTML = "Empty Search or Invalid Location.";
      setTimeout(() => {
        errorMsg.classList.toggle("hidden");
        userInput.value = "";
      }, 1000);
    });
}
function getLocationBtnLocation() {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      fetch(
        `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=&appid=${apiKey}`
      )
        .then((response) => response.json())
        .then((data) => {
          const {name} = data[0]
          getweatherUpdates(name, latitude, longitude)
        })
        .catch(() => {
          errorMsg.classList.toggle("hidden");
          errorMsg.innerHTML = `Some Error Ocuurs While Fetching Data.`;
          setTimeout(() => {
            errorMsg.classList.toggle("hidden");
          }, 1000);
        });
    },
    (error) => {
      errorMsg.classList.toggle("hidden");
      errorMsg.innerHTML = `${error.message}`;
      setTimeout(() => {
        errorMsg.classList.toggle("hidden");
      }, 1000);
    }
  );
}

locationBtn.addEventListener("click", getLocationBtnLocation);
searchBtn.addEventListener("click", getUserLocation);
