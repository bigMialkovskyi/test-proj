<template>
  <div class="register">
    <p>You need to register to continue</p>
    <div>
      <form class="form" @submit.prevent="submit">
        <div>
          <label for="username">User name:</label>
          <input type="text" name="username" v-model="form.login" />
        </div>

        <div class="pass-box">
          <label for="password">Password:</label>
          <input v-if="!showPassword" class="pass-input" type="password" name="password" v-model="inpPass" required />
          <input v-if="showPassword" class="pass-input" type="text" name="password" v-model="inpPass" required />
          <button class="pass-visible-btn">
            <img v-if="!showPassword" @click="toggleShow($event)" class="view-icon" src="../assets/view-filled.svg"
              alt="img" />
            <img v-if="showPassword" @click="toggleShow($event)" class="view-icon" src="../assets/view-off-filled.svg"
              alt="img" />
          </button>
        </div>

        <div class="pass-box">
          <label for="password">Repeat the password:</label>
          <input v-if="!showPasswordRepeat" class="pass-input" type="password" name="password" v-model="inpPassReepat"
            required />
          <input v-if="showPasswordRepeat" class="pass-input" type="text" name="password" v-model="inpPassReepat"
            required />
          <button class="pass-visible-btn">
            <img v-if="!showPasswordRepeat" @click="toggleShowRepeat($event)" class="view-icon"
              src="../assets/view-filled.svg" alt="img" />
            <img v-if="showPasswordRepeat" @click="toggleShowRepeat($event)" class="view-icon"
              src="../assets/view-off-filled.svg" alt="img" />
          </button>
        </div>

        <div>
          <label for="email">Email:</label>
          <input type="email" name="email" v-model="form.email" />
        </div>

        <button class="submit-button" type="submit">Confirm</button>
      </form>
      <p v-if="showError" id="error">{{ errorMessage }}</p>
      <div class="have-account">
        <p>Have an account?</p>
        <router-link to="/">
          <button>Login to personal account</button>
        </router-link>
      </div>
    </div>
  </div>
</template>
  
<script>
import { usersApi } from "@/api/users-api";


export default {
  name: "RegisterPage",

  data() {
    return {
      form: {
        login: "",
        password: "",
        email: "",
      },
      inpPass: "",
      inpPassReepat: "",
      errorMessage: "",
      showError: false,
      showPassword: false,
      showPasswordRepeat: false,
      showModal: false,
    };
  },

  watch: {
    // перевірка на відповідність введених паролів
    // якщо паролі співпадають то доємо їх до форми
    inpPassReepat() {
      if (this.inpPass == this.inpPassReepat) {
        this.form.password = this.inpPassReepat;
        this.errorMessage = "";
        this.showError = false;
      } else {
        this.errorMessage = "passwords do not match";
        this.showError = true;
      }
    },
    inpPass() {
      if (this.inpPass == this.inpPassReepat) {
        this.form.password = this.inpPassReepat;
        this.errorMessage = "";
        this.showError = false;
      } else {
        this.errorMessage = "passwords do not match";
        this.showError = true;
      }
    },
  },

  methods: {
    toggleShow(e) {
      e.preventDefault();
      this.showPassword = !this.showPassword;
    },
    toggleShowRepeat(e) {
      e.preventDefault();
      this.showPasswordRepeat = !this.showPasswordRepeat;
    },
    // функція що передає форму на API 
    // якщо дані відповідають вимогам - створюється новий користувач
    // відправляємо користувача на сторінку для входу 
    async submit() {
      try {
        const response = await usersApi.createUser(this.form)
        // console.log(response)
        if (response.success) {
          this.$router.push({
            name: "login"
          });
        }
      } catch (error) {
        console.error(error);
        this.errorMessage = error.message
        this.showError = true
      }
    }
  },
};
</script>
  
<style scoped lang="scss">
* {
  box-sizing: border-box;
}

.register {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0;
  height: 90vh;
  justify-content: center;
  text-align: center;
}

.form {
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.submit-button {
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}

.have-account {
  // margin-top: 20px;
  padding-top: 20px;

  p {
    background: rgba(0, 0, 0, 0.04);
    box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.06);
    margin: 20px 0;
  }

  button {
    background-color: rgb(3, 37, 65);
    color: white;
    padding: 12px 20px;
    cursor: pointer;
    border-radius: 7px;
    width: 100%;
  }

  button:hover {
    background-color: rgb(6, 66, 114);
    cursor: pointer;
  }
}

label {
  padding: 12px 12px 12px 0;
  display: inline-block;
}

button[type="submit"] {
  background-color: #4caf50;
  color: white;
  padding: 12px 20px;
  cursor: pointer;
  border-radius: 7px;
}

button[type="submit"]:hover {
  background-color: #45a049;
}

input {
  height: 5vh;
  width: 20vh;
  margin: 5px 0 5px 5px;
  box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.06);
  padding: 10px;
  border-radius: 7px;
}

.pass-box {
  display: flex;
  align-items: center;
}

.pass-input {
  width: 15vh;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.pass-visible-btn {
  width: 5vh;
  height: 5vh;
  margin: 0;
  border-left: 0;
  border-top-right-radius: 7px;
  border-bottom-right-radius: 7px;
}

.view-icon {
  height: 3vh;
}

#error {
  color: red;
}
</style>