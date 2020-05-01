var button = document.querySelector(".button");
var city_name = document.querySelector(".city_name");

button.addEventListener("click", function(){
    var city = city_name.value;
    get_coords(city);
})

function get_coords(mycity){;
    var api_city = "https://api.openweathermap.org/data/2.5/weather?q="+ mycity + "&appid=9290fa0eb808f9b5da74303e5d1d3d86";
    fetch(api_city)
        .then(response => response.json())
        .then(data => {
            var latCity = data["coord"]["lat"];
            var lonCity = data["coord"]["lon"];
            get_data(latCity, lonCity);
        });
}

function get_data(lat, lon){
    var api = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=metric&appid=9290fa0eb808f9b5da74303e5d1d3d86";
    fetch(api)
        .then(response => response.json())
        .then(data => {
            var d = new Date(data["current"]["dt"] * 1000)
            document.getElementsByClassName("Date")[0].textContent = d.toString();
            document.getElementsByClassName("Location")[0].textContent = data["timezone"];  
            document.getElementsByClassName("Temperature")[0].textContent = data["current"]["temp"] + " °C";
            document.getElementsByClassName("Weather")[[0]].textContent = data["current"]["weather"][0]["description"];
        });
}
