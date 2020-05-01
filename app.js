const form = document.querySelector(".form");

form.addEventListener("submit", e => {
    e.preventDefault();
    const city_name = form.querySelector(".city_name");
    console.log(city_name.value);
    get_coords(city_name.value);
});

// Get coordinates of city using weather api
function get_coords(mycity) {
    var api_city = "https://api.openweathermap.org/data/2.5/weather?q=" + mycity + "&appid=9290fa0eb808f9b5da74303e5d1d3d86";
    fetch(api_city)
        .then(response => response.json())
        .then(data => {
            try {
                var lat = data["coord"]["lat"];
                var lon = data["coord"]["lon"];
                get_data(lat, lon);
            }
            catch (err) {
                document.getElementById("data").hidden = true;
                document.getElementsByClassName("error")[0].hidden = false;
            }
        });
}

// Get full information using one call api
function get_data(lat, lon) {
    var api = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=metric&appid=9290fa0eb808f9b5da74303e5d1d3d86";
    fetch(api)
        .then(response => response.json())
        .then(data => {
            var d = new Date(data["current"]["dt"] * 1000);
            document.getElementsByClassName("Date")[0].textContent = d.toString();
            document.getElementsByClassName("Location")[0].textContent = data["timezone"];
            document.getElementsByClassName("Temperature")[0].textContent = data["current"]["temp"] + " °C";
            document.getElementsByClassName("Weather")[0].textContent = data["current"]["weather"][0]["description"];
            document.getElementsByClassName("error")[0].hidden = true;
            document.getElementById("data").hidden = false;
        });
}
