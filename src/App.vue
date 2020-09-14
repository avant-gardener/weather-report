<template>
  <Header />
  <Content />
  <Footer />
</template>

<script>
import Header from "./components/Header.vue";
import Content from "./components/Content.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "App",
  components: { Header, Content, Footer },
};
</script>

<style lang="scss">
:root {
  font-size: 24px;
}

#app {
  font-family: "Mali", cursive;
  text-align: center;
  font-size: 24px;
  margin: 0px !important;
  background-color: #d8dee9;
  overflow-x: hidden;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

a {
  color: #d8dee9;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
