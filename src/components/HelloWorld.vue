<template>
  <div>
    <ul class="list" v-if="movies.length">
      <li v-for="movie in movies" :key="movie.id" @click="handleClick(movie.id)">
        <MovieCard v-bind:poster_path="movie.poster_path" v-bind:title="movie.original_title"
          v-bind:vote="movie.vote_average" v-bind:release="movie.release_date" />
      </li>
    </ul>
    <div @click="loadNextPage()" class="more-btn">
      <p>more</p>
    </div>
  </div>
</template> 

<script>
import { movieApi } from "@/api/movie-api";
import MovieCard from "./MovieCard.vue";

export default {
  components: { MovieCard },
  name: "HelloWorld",
  props: {
    msg: String
  },
  data: function () {
    return {
      movies: [],
      apiPage: 1
    };
  },
  mounted: async function () {
    // отримуємо список з фільмами
    this.getMovieList();
  },
  methods: {
    // функція що повертає список з філмаии
    async getMovieList() {
      const response = await movieApi.getMovieList(this.apiPage);
      this.movies = response.data.results;
    },
    // збільшуємо лічильник сторінок при натисканні на кнопку
    async loadNextPage() {
      this.apiPage = this.apiPage + 1
      console.log(this.apiPage)
    },
    // перехід на інший роут з додаванням квері параметра 
    handleClick(movieId) {
      this.$router.replace({
        name: "movie-page",
        query: { id: movieId },
      });
    },
  },

  watch: {
    // при зміні лічильника сторінок підвантажується додатковий контент.
    async apiPage() {
      const response = await movieApi.getMovieList(this.apiPage);
      this.movies = this.movies.concat(response.data.results)
    }
  }
}
</script> 

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

.more-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5vh 0 5vh 0;
  width: 20vw;
  height: 5vh;
  margin-right: auto;
  margin-left: auto;
  border-radius: 7px;
  border: 1px solid #e3e3e3;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .1);
  transition: .5s;
  background-color: rgba(0, 255, 0, .5);

  p {
    text-transform: uppercase;
    user-select: none;
  }
}

.more-btn:hover {
  background-color: rgba(0, 255, 0, .7);
  box-shadow: 7px 9px 15px rgba(0, 0, 0, .3);
}

.more-btn:active {
  background-color: rgba(0, 255, 0, .3);
}

h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

a {
  color: #42b983;
}
</style>
