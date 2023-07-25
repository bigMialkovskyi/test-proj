import axios from 'axios';

// функцыя що повертає список популярних фільмів 
// аргументом приймає номер сторінки (потрібно для АРІ)
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
    // console.log(response)
    return response
  } catch (error) {
    console.error(error);
  }
}

// функція для отримання детальної інформації про фільм
// приймає аргументом ID фільму
const getMovieInformation = async (ID) => {
  const config = {
    headers: {
      Authorization: process.env.VUE_APP_API_KEY,
      accept: `application/json`
    }
  }
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${ID}?append_to_response=images,credits`, config);
    // console.log(response)
    return response
  } catch (error) {
    console.error(error);
  }
}

// функція для пошуку фільмів за назвою та мовою оригіналу
const searchMovie = async (searchParams, page) => {
  const config = {
    headers: {
      Authorization: process.env.VUE_APP_API_KEY,
      accept: `application/json`
    },
    params: {
      query: searchParams.query,
      language: searchParams.language,
      page
    }
  }
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, config);
    // console.log(response)
    return response
  } catch (error) {
    console.error(error);
  }
}

// експорт функцій
export const movieApi = {
  getMovieList,
  getMovieInformation,
  searchMovie
};  