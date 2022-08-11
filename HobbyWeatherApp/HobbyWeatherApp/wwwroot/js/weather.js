

$(function () {
    yourLocation();
});

function yourLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
        console.log("Geolocation is not supported by this browser");
    }
}

function showPosition(position) {
    let lat = position.coords.latitude.toFixed(2);
    let lon = position.coords.longitude.toFixed(2);
    console.log(lat + " " + lon);

    const apiKey = "03f416d613b744b2915e664eccfb7dd0";
    const url = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
    $.get(url, function (data) {
        showWeather(data);
        $("#weatherIn").html("You are in " + data.name);
    }).fail(function () {
        $("#error").html("Can´t find current position");
    })


}

function getWeather() {
    const apiKey = "03f416d613b744b2915e664eccfb7dd0";
    const city = document.getElementById('city').value;
    console.log(city);

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

    $.get(url, function (data) {
        console.log(data);
        showWeather(data);
        resetError();

    }).fail(function () {
        $("#error").html("We could not find any place named " + '"' + city + '"');
        $("#weatherIn").html("");
        $("#temp").html("");
        $("#icon").html("");
        $("#description").html("");
        $("#humidity").html("");
        $("#wind").html("");
    });
}

function showWeather(data) {
    document.getElementById("city").value = "";

    let celsius = Math.round(data.main.temp - 273.15);
    let ut = celsius + " °C";
    $("#weatherIn").html("Weather in " + data.name);
    $("#temp").html(ut);

    var iconcode = data.weather[0].icon;
    var iconurl = "http://openweathermap.org/img/wn/" + iconcode + ".png";
    $("#icon").html("<img src=" + iconurl + ">");
    $("#description").html(data.weather[0].description);
    $("#humidity").html("Humidity: " + data.main.humidity);
    $("#wind").html("Wind speed: " + data.wind.speed + "km/h");

}

function resetError() {
    $("#error").html("");
}
@ 
