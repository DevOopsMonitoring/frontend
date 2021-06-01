<template>
  <div class="home">
    <h2 class='home-text'>Добро пожаловать в</h2>
    <h2 class='devoops'>DevOops</h2>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
};
</script>

<style scoped>
  .home-text {
    color: white;
    margin: 0;
    margin-top: 20vh;
  }

  .devoops {
    color: white;
    margin: 0;
  }

  @media screen and (min-width: 601px) {
    h2.home-text {
      font-size: 50px;
    }
    h2.devoops {
      font-size: 100px;
    }
  }

/* If the screen size is 600px wide or less, set the font-size of <div> to 30px */
  @media screen and (max-width: 600px) {
    h2.home-text {
      font-size: 30px;
    }
    h2.devoops {
      font-size: 50px;
    }
  }
</style>
