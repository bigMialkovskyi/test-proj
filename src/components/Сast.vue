<template>
  <div>
    <h1 class="title">Cast</h1>
    <ul v-if="list.length" class="list">
      <li v-if="actor.profile_path" v-for="actor in list" :key="actor.id">
        <div class="card">
          <img class="poster" :src="`https://image.tmdb.org/t/p/w500` + `${actor.profile_path}`" alt="poster">
          <div class="desc">
            <p class="name">{{ actor.name }}</p>
            <p class="character">{{ actor.character }}</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
  
<script>
export default {
  name: 'Cast',
  props: {
    list: Array
  },
}
</script> 
  
<style scoped lang="scss">
.list {
  display: flex;
  overflow: auto;
}

.card {
  position: static;
  width: 10vw;
  margin: 2vh 1vw 2vh 1vw;
  border-radius: 7px;
  border: 1px solid #e3e3e3;
  box-shadow: 7px 9px 15px rgba(0, 0, 0, .3);
  transition: .5s;

  img {
    width: 10vw;
    border-radius: 7px 7px 0 0;
  }
}

.desc {
  height: 10vh;
}

.name {
  margin: 2vh 0;
  font-weight: 700;
  color: #000;
  font-size: 1em;
}

.character {
  margin-bottom: 0;
  padding: 0 10px;
  font-size: .9em;
  color: #000;
  user-select: none;
}

.title {
  text-align: left;
  font-weight: 600;
  font-size: 1.4em;
  margin: 2vh 2vw;
  box-sizing: border-box;
}

h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
  