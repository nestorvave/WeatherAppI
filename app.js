const city = document.querySelector("#city");
const search = document.querySelector("#search");
const feelLike = document.querySelector(".feels-like");
const wind = document.querySelector(".wind");
const pressureValue = document.querySelector(".pressureValue");
const humidityValue = document.querySelector(".humidityValue");
const visibilityValue = document.querySelector(".visibilityValue");
const dateToday = document.querySelector(".date");
const tempMax = document.querySelector(".tempMax");
const tempMin = document.querySelector(".tempMin");
const des = document.querySelector(".des");
const cityValue = document.querySelector(".city");
const tempValue = document.querySelector(".tempValue");
const iconTemperature = document.querySelector(".icon-temperature");
const addShow = document.querySelector(".none");

const apiKey = "5628ce825c4a47c6ea0663fab38aaece";
const days = [
  "Monday",
  "Tusday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

search.addEventListener("click", (e) => {
  e.preventDefault();
  addShow.classList.remove("none");
  addShow.classList.remove("show");

  let cityName = city.value;
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric&lang=en`
  )
    .then((response) => response.json())
    .then((data) => {
      city.value = "";
      let { feels_like, humidity, pressure, temp, temp_max, temp_min } =
        data.main;
      let { speed } = data.wind;
      const currentTempMax = Math.round(temp_max);
      const currentTempMin = Math.round(temp_min);
      const currentTemp = Math.round(temp);

      //GET MAIN DATA
      feelLike.innerHTML = `${feels_like} ° `;
      wind.innerHTML = `${speed} km/h`;
      pressureValue.innerHTML = `${pressure} hPa`;
      humidityValue.innerHTML = `${humidity} %`;
      visibilityValue.innerHTML = `${data.visibility} km`;
      tempMax.innerHTML = `${currentTempMax}`;
      tempMin.innerHTML = `${currentTempMin}`;
      tempValue.innerHTML = `${currentTemp}`;

      //DATE

      const date = new Date();
      const getday = date.getDay();
      const getMonth = date.getMonth();
      const getDate = date.getDate();
      const getYear = date.getFullYear();
      if (getday == 0) {
        currentDate = `${days[getday + 6]}, ${getDate} ${
          months[getMonth]
        } ${getYear}`;
      } else {
        currentDate = `${days[getday - 1]}, ${getDate} ${
          months[getMonth]
        } ${getYear}`;
      }
      dateToday.innerHTML = currentDate;

      //DESCRIPTION AND ICON
      data.weather.forEach((element) => {
        des.innerHTML = element.description;
        const getIcon = element.icon;
        const urlIcon = `http://openweathermap.org/img/wn/${getIcon}@2x.png`;
        iconTemperature.setAttribute("src", urlIcon);
      });

      //CITY

      const getCity = data.name;
      const getCountry = data.sys.country;
      cityValue.innerHTML = `${getCity}, ${getCountry}`;
    });
});
