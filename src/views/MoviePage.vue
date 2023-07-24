<template>
  <div>
    <div v-if="movie"
      :style="{ 'background-image': `url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/` + `${movie.backdrop_path}` + `)` }"
      class="card">
      <div class="filter">
        <img class="poster" :src="`https://image.tmdb.org/t/p/w500` + `${movie.poster_path}`" alt="poster">
        <div class="banner-content">
          <h1 class="title">{{ movie.original_title }}</h1>

          <div class="vote-container">
            <p class="vote">vote</p>
            <div class="vote-bar"
              :style="{ 'background-image': `linear-gradient(90deg, rgba(30, 144, 255, 1) ` + `${movie.vote_average * 10}` + `%, rgba(0, 0, 0, 0) ` + `${movie.vote_average * 10}` + `%)` }">
              <p class="vote-vallue">{{ movie.vote_average }}</p>
            </div>
          </div>

          <ul class="list" v-if="movie.genres.length">
            <li v-for=" genre in movie.genres" :key="genre.id">
              <p class="gener">{{ genre.name }}</p>
            </li>
          </ul>


          <ul class="list" v-if="movie.production_companies.length">
            <li v-for=" companie in movie.production_companies" :key="companie.id">
              <p class="gener">{{ companie.name }}</p>
            </li>
          </ul>

          <ul class="list" v-if="movie.production_countries.length">
            <li v-for=" сounrtie in movie.production_countries" :key="сounrtie.name">
              <p class="gener">{{ сounrtie.iso_3166_1 }}</p>
            </li>
          </ul>

          <p class="tagline">{{ movie.tagline }}</p>

          <p class="description">{{ movie.overview }}</p>

        </div>
      </div>
    </div>
    <Cast v-if="movie" :list="movie.credits.cast" />
    <Gallery v-if="movie" :list="movie.images.posters" />
  </div>
</template>
  
<script>
import { movieApi } from "@/api/movie-api";
import Cast from "@/components/Сast.vue";
import Gallery from "@/components/Gallery.vue";

export default {
  name: 'MovieCard',
  components: { Cast, Gallery },

  data: function () {
    return {
      movie: null,
    };
  },

  mounted: async function () {
    this.getMovie()
  },

  methods: {
    // функція що отримує повну інформацію про фільм 
    async getMovie() {
      const response = await movieApi.getMovieInformation(this.$route.query.id);
      this.movie = response.data
      // console.log(this.movie)
    },
  }
}
</script> 
  
<style scoped lang="scss">
.card {
  // height: 50vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.filter {
  background-color: rgba(3, 37, 65, .7);
  height: 100%;
  width: 100%;
  padding: 3vh 3vw 3vh 3vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.poster {
  width: 20vw;
  border-radius: 7px;
}

.banner-content {
  width: 70vw;
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  align-items: start;
  background-color: rgba(3, 37, 65, .9);
  padding: 1vh 1vw 1vh 1vw;
  // height: 100%;
}

.title {
  font-weight: 700;
  font-size: 2.2rem;
  color: white;
  text-align: left;
}

.list {
  margin: 1vh 0;
}

.gener,
.vote-vallue {
  color: #fff;
  font-weight: 400;
  font-size: 1em;
}

.vote-container {
  margin: 1vh;
}

.vote {
  margin: 1vh;
  font-weight: 700;
  margin-left: 6px;
  white-space: pre-line;
  color: #fff;
}

.tagline {
  margin: 1vh 0;
  color: #fff;
  font-size: 1.1em;
  font-weight: 400;
  font-style: italic;
  opacity: .7;
}

.description {
  margin: 1vh 0;
  font-size: 1em;
  // margin: 0 0 16px;
  color: #fff;
  text-align: left;
}

.vote-bar {
  width: 20vw;
  border-radius: 50px;
  border: 1px solid rgba(30, 144, 255, 1);
}

@media screen and (max-width: 575px) {

  .filter {
    flex-direction: column;
  }

  .poster {
    width: 80vw;
    margin: 0;
    border-bottom-left-radius: 0%;
    border-bottom-right-radius: 0%;
  }

  .banner-content {
    border-top-left-radius: 0%;
    border-top-right-radius: 0%;
    width: 80vw;
  }

  .vote-bar {
    width: 40vw;
  }

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
  