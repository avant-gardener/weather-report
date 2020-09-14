<template>
  <header>
    <h1 name="title-bar" id="title">The Weather Report</h1>
  </header>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style lang="scss">
header {
  background-color: #81a1c1;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 72px;
  height: 9.9vh;
  width: 100vw;
}

#title {
  /* font-size: 62px; */
  font-size: 2.3333rem;
  font-weight: 1000;
  color: #eceff4;
}

@media screen and (max-width: 600px) {
  header {
    min-height: 48px;
    height: 7vh;
  }

  #title {
    font-size: 1.75rem;
  }
}

@media screen and (max-width: 440px) {
  #title {
    font-size: 1.1666rem;
  }
}
</style>
