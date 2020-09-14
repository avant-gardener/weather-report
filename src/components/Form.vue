<template>
  <form @submit.prevent="handleSubmit" id="form">
    <label for="city_name">Enter a location</label>
    <input
      v-model="city"
      name="city"
      type="text"
      class="city_name"
      id="city_name"
      placeholder="Location Name"
      autocomplete="off"
    />
  </form>
</template>

<script>
export default {
  name: "Form",
  data() {
    return {
      city: "",
    };
  },
  methods: {
    handleSubmit() {
      this.$emit("new-data", this.city);
    },
  },
};
</script>

<style lang="scss">
#form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

input[type="text"] {
  font-family: "Mali", cursive;
  font-weight: 400;
  font-size: 24px;
  text-align: center;
  max-width: 420px;
  width: 95%;
  max-height: 40px;
  min-height: 30px;
  height: 5vh;
  border: solid;
  color: #4c566a;
  border-color: #88c0d0;
  background-color: #eceff4;
  border-radius: 20px;
  border-width: 2px;
}

input[type="text"]:focus {
  border-color: #81a1c1;
  border-width: 3px;
  padding: 0px;
  outline: none;
}

label {
  display: block;
  font-weight: 700;
  font-size: 18px;
  color: #4c566a;
  padding-bottom: 4px;
}
</style>
