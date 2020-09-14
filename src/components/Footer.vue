<template>
  <footer>
    <div class="footer">
      Data from
      <a href="https://www.openweathermap.org">openweathermap.org</a>
    </div>
    <div class="footer">
      <a href="https://www.nordtheme.com/">Nord</a> color theme - Icons from
      <a href="https://erikflowers.github.io/weather-icons/">erikflowers</a>
    </div>
  </footer>
</template>

<style lang="scss">
footer {
  background-color: #81a1c1;
  color: #81a1c1;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 45px;
  height: 6vh;
  width: 100vw;
}

.footer {
  font-weight: 500;
  font-size: 12px;
  color: #e5e9f0;
}
</style>
