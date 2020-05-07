const form = document.querySelector(".form");

form.addEventListener("submit", e => {
    e.preventDefault();
    document.getElementById("city_name").blur();
    form.blur;
    const city_name = form.querySelector(".city_name");
    get_coords(city_name.value);
});

// Get coordinates of location using weather api and set location name
function get_coords(mycity) {
    var api_city = "https://api.openweathermap.org/data/2.5/weather?q=" + mycity + "&appid=9290fa0eb808f9b5da74303e5d1d3d86";
    fetch(api_city)
        .then(response => response.json())
        .then(data => {
            try {
                var lat = data["coord"]["lat"];
                var lon = data["coord"]["lon"];
                document.getElementsByClassName("location-data")[0].textContent = mycity + ", " + data["sys"]["country"];
                get_data(lat, lon);
            }
            catch (err) {
                document.getElementById("content-container").hidden = true;
                document.getElementsByClassName("error")[0].hidden = false;
            }
        });
}

// Get full information using one call api and set other data
function get_data(lat, lon) {
    var api = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=metric&appid=9290fa0eb808f9b5da74303e5d1d3d86";
    fetch(api)
        .then(response => response.json())
        .then(data => {
            // https://stackoverflow.com/questions/10087819/convert-date-to-another-timezone-in-javascript
            var d = new Date().toLocaleString("tr-TR", { timeZone: data["timezone"] });
            document.getElementsByClassName("Date")[0].textContent = d.toString();
            document.getElementsByClassName("temperature-data")[0].textContent = data["current"]["temp"] + " °C";
            document.getElementsByClassName("Weather")[0].textContent = data["current"]["weather"][0]["description"];
            document.getElementsByClassName("error")[0].hidden = true;
            document.getElementById("content-container").hidden = false;
            change_icon(data);
        });
}

//  https://codepen.io/KryptoniteDove/post/load-json-file-locally-using-pure-javascript
function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open("GET", "icons.json", true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

// https://gist.github.com/tbranyen/62d974681dea8ee0caa1
function change_icon(data) {
    var prefix = "wi wi-";
    loadJSON(function (response) {
        var weather_icons = JSON.parse(response);
        var icon = weather_icons[data["current"]["weather"][0]["id"]].icon;
        var time_prefix;
        const date = new Date(data["current"]["dt"] * 1000);
        const sunrise = new Date(data["current"]["sunrise"] * 1000); //Convert a Unix timestamp to time
        const sunset = new Date(data["current"]["sunset"] * 1000);
        if (date.getHours() >= sunrise.getHours() && date.getHours() < sunset.getHours()) {
            time_prefix = "day-";
        }
        else if (date.getHours() >= sunset.getHours() || date.getHours() < sunrise.getHours()) {
            time_prefix = "night-";
            if (icon === "sunny") {
                icon = "clear";
            }
        }
        var final_icon = prefix + time_prefix + icon;
        document.getElementById("icon").className = final_icon;
    });
}
