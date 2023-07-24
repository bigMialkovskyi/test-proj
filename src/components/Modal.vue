<template>
  <div @wheel.prevent @touchmove.prevent @scroll.prevent class="modal-container">
    <div class="modal-content">
      <div @click="$emit('close')" class="close-btn"><span>X</span></div>
      <div class="input-element">
        <label for="title">enter the title of the movie or part of it</label>
        <input v-model="name" type="text">
      </div>
      <select v-model="language">
        <option v-for="lang in languages" :key="lang.code" :value="lang.code">
          {{ lang.name }}
        </option>
      </select>
      <button class="nav-btn" @click="searchMovies()">search</button>
    </div>
  </div>
</template>
    
<script>
export default {
  data: function () {
    return {
      name: '',
      language: null,
      languages: [
        {
          name: 'English',
          code: 'en',
        },
        {
          name: 'Ukrainian',
          code: 'ua',
        }
      ]
    };
  },
  name: 'Modal',
  emits: ['search', 'close'],
  methods: {
    searchMovies() {
      const payload = {
        query: this.name,
        language: this.language
      }
      this.$emit('search', payload)
      this.$emit('close')
    }
  }
}
</script> 

<style scoped lang="scss">
label {
  font-size: 1.2rem;
  color: white;
  text-transform: uppercase;
  margin: 1vh 0;
}

select {
  height: 5vh;
  width: 20vw;
  border-radius: 5px;
  color: white;
  font-weight: lighter;
  background-color: rgb(3, 37, 65);
  border: 2px solid rgb(20, 93, 167);
  box-shadow: 0px -14px 14px rgba(0, 0, 255, 0.1) inset;
  font-size: 1.1rem;
}

input {
  margin-left: auto;
  margin-right: auto;
  padding: 0 1vh;
  height: 5vh;
  width: 20vw;
  border-radius: 5px;
  color: white;
  font-weight: lighter;
  background-color: rgb(3, 37, 65);
  border: 2px solid rgb(20, 93, 167);
  box-shadow: 0px -14px 14px rgba(0, 0, 255, 0.1) inset;
  font-size: 1.1rem;
}

.modal-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1000;
  overflow: hidden;
}

.modal-content {
  padding: 2vh;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 7px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 2000;
  width: 50vw;
  height: 60vh;
  background-color: rgb(3, 37, 65);
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
}

.nav-btn {
  text-transform: uppercase;
  width: 80px;
  height: 40px;
  border-radius: 10%;
  border: none;
  background-color: rgb(3, 37, 65);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  transition: .5s;
}

.nav-btn:hover {
  background-color: rgb(6, 66, 114);
  cursor: pointer;
}

.nav-btn:active {
  background-color: rgb(14, 96, 162);
}

.input-element {
  display: flex;
  flex-direction: column;
}

.close-btn {
  cursor: pointer;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0px;
  top: 0px;
  z-index: 3000;
  width: 40px;
  height: 40px;
  margin-top: -0.5px;
  background-color: rgb(3, 37, 65);
  border-radius: 10%;
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  transition: .5s;
}

.close-btn:hover {
  background-color: rgb(6, 66, 114);
  cursor: pointer;
}

.close-btn:active {
  background-color: rgb(14, 96, 162);
}

@media screen and (max-width: 968px) {}

@media screen and (max-width: 767px) {
  .modal-container {
    height: 120%;
  }

  .modal-content {
    top: 40%;
    width: 75vw;
  }

  input {
    height: 5vh;
    width: 45vw;
  }

  select {
    height: 5vh;
    width: 45vw;
  }
}
</style>

    