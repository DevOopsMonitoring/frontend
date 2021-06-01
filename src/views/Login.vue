<template>
  <div class="login">
    <div>
      <form @submit.prevent="submit">
        <div>
          <input placeholder='Логин' type="text" name="username" v-model="form.username" />
        </div>
        <div>
          <input placeholder='Пароль' type="password" name="password" v-model="form.password" />
        </div>
        <button type="submit">Войти</button>
      </form>
      <p v-if="showError" id="error">Username or Password is incorrect</p>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Login",
  components: {},
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      showError: false
    };
  },
  methods: {
    ...mapActions(["LogIn"]),
    async submit() {
      try {
          await this.LogIn({username: this.form.username, password: this.form.password});
          // this.$router.push("/charts");
          this.showError = false
      } catch (error) {
        this.showError = true
      }
    },
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.login {
  padding: 60px 35px 35px 35px;
  margin: 60px auto 0px auto;
  border-radius: 40px;
  background: #ecf0f3;
}


button[type="submit"] {
  background-color: #23a6d5;
  color: white;
  margin-top: 20px;
  padding: 12px 50px;
  cursor: pointer;
  border-radius: 30px;
  border-width: 0px;
  outline: none;
}

button[type="submit"]:hover {
  background-color: #006ab3;
  transition: 0.5s;
}

input {
  border-width: 0px;
  font-size: 15px;
  padding: 10px;
  margin: 10px;
  border-radius: 20px;
  box-shadow: 0px 0px 50px #c0c5ca,
              -0px -0px 50px #ffffff;
}

input:focus{
  outline: none;
}

#error {
  color: red;
}

@media screen and (min-width: 601px) {
    div.login {
      width: 700px
    }
    input {
      line-height: 20px;
      width: 500px;
    }
  }

/* If the screen size is 600px wide or less, set the font-size of <div> to 30px */
  @media screen and (max-width: 600px) {
    div.login {
      width: 330px;
    }
    input {
      line-height: 20px;
      width: 230px;
    }
  }
</style>
