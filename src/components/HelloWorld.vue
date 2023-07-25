<template>
  <div>
    <div @click="showModal = true" class="nav-btn blue-btn">
      <p>search</p>
    </div>
    <Modal v-if="showModal" @search="onSearch" @close="showModal = false" />
    <ul class="list" v-if="movies.length">
      <li v-for="movie in movies" :key="movie.id" @click="handleClick(movie.id)">
        <MovieCard :poster_path="movie.poster_path" :title="movie.original_title" :vote="movie.vote_average"
          :release="movie.release_date" />
      </li>
    </ul>
    <div class="btn-bar">
      <div @click="loadNextPage()" class="nav-btn green-btn">
        <p>more</p>
      </div>

      <div @click="clearFilter()" class="nav-btn green-btn">
        <p>clean the filter</p>
      </div>

    </div>
  </div>
</template> 

<script>
import { movieApi } from "@/api/movie-api";
import MovieCard from "./MovieCard.vue";
import Modal from "@/components/Modal.vue"

export default {
  components: { MovieCard, Modal },
  name: "HelloWorld",
  data: function () {
    return {
      movies: [],
      apiPage: 1,
      showModal: false,
      searchParams: null
    };
  },
  mounted: async function () {
    // першочергове стоврення списку з фільмами
    this.getMovieList();
  },
  methods: {
    // функція що повертає  список фільмів, аргументом приймє номер сторінки (потрібно для АРІ)
    async getMovieList() {
      const response = await movieApi.getMovieList(this.apiPage);
      this.movies = response.data.results;
    },
    // інкрементація лічильника сторінок
    async loadNextPage() {
      this.apiPage = this.apiPage + 1
    },
    // при натисканню на кртку отримуємо її ID та переходимо на сторінку з детальною інформацією про фільм
    // ID передається через query параметр, потрібний на сторінці фільма щоб отримати повну інформацію
    handleClick(movieId) {
      this.$router.replace({
        name: "movie-page",
        query: { id: movieId },
      });
    },
    // функція для пошуку фільмів, аргументами приймає форму в якій міститься назва бо її частина та код країни виробника
    // інший параметр номер сторінки ( аналогічно getMovieList )
    async onSearch(params) {
      // зупинка роботи функції якщо користувач не сформував фільтр для пошуку
      if (!params.query.length) return
      this.searchParams = params
      const response = await movieApi.searchMovie(params, this.apiPage);
      this.movies = response.data.results;
    },
    // функція що очищає параметри для пошуку
    async clearFilter() {
      // припиняє свою роботу якщо фільтр і так порожній
      if (!this.searchParams) return
      this.movies = []
      this.apiPage = 1
      this.searchParams = null
      const response = await movieApi.getMovieList(this.apiPage);
      this.movies = this.movies.concat(response.data.results)
    }
  },

  watch: {
    // при зміні лічильника ( після натискання кнопки "MORE" ), завантажується доадатковий контент
    async apiPage() {
      // якщо фільтр для пошуку заповнений завантажуються фільми які підходять за параметрами
      if (this.searchParams) {
        const response = await movieApi.searchMovie(this.searchParams, this.apiPage);
        if (response.data.total_pages < this.apiPage) return
        // до існуючого масиву з фільмами додаємо новий контент
        this.movies = this.movies.concat(response.data.results)
      }
      // якщо фільт порожній завантажується наступна сторінка популярних фільмів
      else {
        const response = await movieApi.getMovieList(this.apiPage);
        this.movies = this.movies.concat(response.data.results)
      }
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

.btn-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-btn {
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5vh 0 5vh 0;
  width: 20vw;
  height: 5vh;
  margin-right: auto;
  margin-left: auto;
  border-radius: 7px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .1);
  transition: .5s;

  p {
    text-transform: uppercase;
    user-select: none;
  }
}

.nav-btn:hover {
  box-shadow: 7px 9px 15px rgba(0, 0, 0, .3);
  cursor: pointer;
}

.green-btn {
  background-color: rgb(1, 162, 1);
}

.blue-btn {
  background-color: rgb(3, 37, 65);
}

.green-btn:hover {
  background-color: rgba(0, 255, 0, .7);
}

.green-btn:active {
  background-color: rgba(0, 255, 0, .3);
}

.blue-btn:hover {
  background-color: rgb(6, 66, 114);
}

.blue-btn:active {
  background-color: rgb(14, 96, 162);
}

@media screen and (max-width: 575px) {
  .nav-btn {
    width: 40vw;
    height: 5vh;

    p {
      font-size: 12px;
    }
  }
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
