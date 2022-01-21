const button = document.getElementById("getCurrentWeather");
const selectBox = document.getElementById("cityList");

const apiKey = "f847023ac7fd05f740bd61dc050203fe";
const baseUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}`;

const getData = (obj) => {
  const url =
    obj.location == "current"
      ? `${baseUrl}&lat=${obj.lat}&lon=${obj.lon}`
      : `${baseUrl}&q=${obj.city}`;

  $.get(url, function (data, status) {
    if (status != "success") return alert("Something went wrong");
    $("#city").text(data.name);
    $("#weather").text(data.weather[0].main);
    $("#temperature").html(Math.round(data.main.temp - 273) + "&deg;C");
  });
};

const successCallback = (position) => {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  getData({ location: "current", lat, lon });
};
const failureCallback = (error) => {
  console.log(error);
};

const getCurrentLocationWeather = (e) => {
  e.preventDefault();

  if (navigator.geolocation) {
    console.log("navigator available");
    navigator.geolocation.getCurrentPosition(successCallback, failureCallback);
  } else {
    console.log("navigator unavailable");
  }
};

const getSelectedLocationWeather = () => {
  getData({ location: "selected", city: $("#cityList").val() });
};

button.addEventListener("click", getCurrentLocationWeather);
selectBox.addEventListener("change", getSelectedLocationWeather);
