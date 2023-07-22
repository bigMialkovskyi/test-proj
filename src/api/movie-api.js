import axios from 'axios';

const getMovieList = async (page) => {
  const config = {
    headers: {
      Authorization: process.env.VUE_APP_API_KEY,
      accept: `application/json`
    },
    params: {
      page: page
    }
  }
  try {
    const response = await axios.get("https://api.themoviedb.org/3/movie/popular", config);
    console.log(response)
    return response
  } catch (error) {
    console.error(error);
  }
}

const getMovieInformation = async (ID) => {
  const config = {
    headers: {
      Authorization: process.env.VUE_APP_API_KEY,
      accept: `application/json`
    }
  }
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${ID}?append_to_response=images,credits`, config);
    console.log(response)
    return response
  } catch (error) {
    console.error(error);
  }
}

export const movieApi = {
  getMovieList,
  getMovieInformation
};  