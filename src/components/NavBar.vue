<template>
  <div id="nav" align="left">
    <router-link to="/">Главная</router-link> |
    <router-link to="/posts">Показатели</router-link> |
    <span v-if="isLoggedIn">
      <a @click="logout">Выйти</a>
    </span>
    <span v-else>
      <router-link to="/register">Зарегистрироваться</router-link> |
      <router-link to="/login">Войти</router-link>
    </span>
  </div>
</template>
<script>
export default {
  name: "NavBar",
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
    async logout() {
      await this.$store.dispatch("LogOut");
      this.$router.push("/login");
    },
  },
};
</script>

<style>
#nav {
  padding: 30px;
  color: white;
}

#nav a {
  font-weight: bold;
  color: white;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 0px;
  text-decoration: none;
}

a:hover {
  cursor: pointer;
}

#nav a.router-link-exact-active {
  text-decoration: underline;
}
</style>
