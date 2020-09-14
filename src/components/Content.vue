<template>
  <div id="content">
    <Form @new-data="checkForm($event)" />
    <p v-if="showError" class="error">Location not found</p>
    <section v-if="showContent" id="content-container">
      <section id="date-container">
        <label>Date</label>
        <div class="Date">{{ date }}</div>
      </section>

      <section id="data-container">
        <div class="data Location">
          <label>Location</label>
          <div class="location-data">{{ location }}</div>
        </div>
        <div class="data Temperature">
          <label>Temperature</label>
          <div class="temperature-data">{{ temperature }}</div>
        </div>
        <section class="data" id="weather-container">
          <label>Weather</label>
          <div class="Weather">{{ weather }}</div>
          <div class="icon">
            <i id="icon" class="wi wi-200"></i>
          </div>
        </section>
      </section>
    </section>
  </div>
</template>

<script>
import Form from "./Form.vue";

export default {
  name: "Content",
  components: { Form },
  data() {
    return {
      showContent: false,
      showError: false,
      city_name: "",
      date: "",
      location: "",
      temperature: "",
      weather: "",
    };
  },
  methods: {
    checkForm(cityName) {
      this.getCoords(cityName);
    },
    getData(lat, lon) {
      const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=9290fa0eb808f9b5da74303e5d1d3d86`;
      fetch(api)
        .then((response) => response.json())
        .then((data) => {
          const d = new Date().toLocaleString("tr-TR", {
            timeZone: data.timezone,
          });
          this.date = d.toString();
          this.temperature = data.current.temp;
          this.weather = data.current.weather[0].description;
          this.showContent = true;
        });
    },
    getCoords(cityName) {
      const apiCity = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=9290fa0eb808f9b5da74303e5d1d3d86`;
      fetch(apiCity)
        .then((response) => response.json())
        .then((data) => {
          try {
            this.location = `${cityName}, ${data.sys.country}`;
            this.getData(data.coord.lat, data.coord.lon);
          } catch (err) {
            this.showContent = false;
            this.showError = true;
          }
        });
    },
  },
};
</script>

<style lang="scss">
#content {
  flex: 1 0 auto;
  margin-top: 12vh;
}

section[hidden] {
  display: none !important;
}

#content-container {
  display: flex;
  height: fit-content;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  color: #434c5e;
  text-transform: capitalize;
}

#data-container {
  display: flex;
  min-width: min-content;
  width: 100%;
  flex-direction: row;
  align-items: stretch;
  justify-content: center;
  font-size: 32px;
}

#date-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  padding-top: 10px;
  padding-bottom: 0px;
}

.data {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  max-width: 260px;
  flex-basis: 33.33%;
  min-height: 10vh;
  padding-bottom: 20px;
}

#weather-container {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
}

#icon {
  margin-top: 24px;
  font-size: 80px;
}

.Date {
  font-size: 24px;
  padding-top: 0px;
  padding-bottom: 25px;
}

.error {
  color: #434c5e;
  font-size: 28px;
  font-weight: 700;
}

@media screen and (max-width: 600px) {
  #content-container {
    height: fit-content;
    justify-content: flex-start;
    align-items: center;
  }

  #data-container {
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    width: 70%;
  }

  #content {
    margin-top: 5vh;
  }

  .data {
    max-width: 100%;
    justify-content: center;
    align-items: center;
  }
}
</style>
