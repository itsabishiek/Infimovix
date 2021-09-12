import axios from "axios";

//image sizes for tmdb
export const img_base = "https://image.tmdb.org/t/p/original";
export const img_300 = "https://image.tmdb.org/t/p/w300";
export const img_500 = "https://image.tmdb.org/t/p/w500";
export const img_780 = "http://image.tmdb.org/t/p/w780";
export const img_1280 = "http://image.tmdb.org/t/p/w1280";

// contentModal and singleContent
export const unavailable =
  "https://www.movienewz.com/img/films/poster-holder.jpg";

// contentModal
export const unavailableLandscape =
  "https://user-images.githubusercontent.com/10515204/56117400-9a911800-5f85-11e9-878b-3f998609a6c8.jpg";

// For Carousel
export const noPicture =
  "https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg";

// const apiKey = "52e28db24f9bc94a1c0fce73f9812764";
const url = "https://api.themoviedb.org/3";
const nowPlayingUrl = `${url}/movie/now_playing`;
const topratedUrl = `${url}/movie/top_rated`;
const movieUrl = `${url}/movie`;
const seriesUrl = `${url}/tv`;
const genreUrl = `${url}/genre/movie/list`;
const moviesUrl = `${url}/discover/movie`;
const personUrl = `${url}/trending/person/week`;
const netflixOriginalsUrl = `${url}/discover/tv`;
const comedyMovies = `${url}/discover/movie`;
const horrorMovies = `${url}/discover/movie`;
const romanceMovies = `${url}/discover/movie`;
const documentaries = `${url}/discover/movie`;

export const requests = {
  fetchBanner: `${url}/trending/all/week?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`,
};

export const fetchMovies = async () => {
  try {
    const { data } = await axios.get(nowPlayingUrl, {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
        language: "en_US",
        page: 1,
      },
    });

    const posterUrl = "https://image.tmdb.org/t/p/original/";
    const modifiedData = data["results"].map((m) => ({
      id: m["id"],
      backPoster: posterUrl + m["backdrop_path"],
      popularity: m["popularith"],
      title: m["title"],
      poster: posterUrl + m["poster_path"],
      overview: m["overview"],
      rating: m["vote_average"],
    }));

    return modifiedData;
  } catch (error) {}
};

export const fetchGenre = async () => {
  try {
    const { data } = await axios.get(genreUrl, {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
        language: "en_US",
        page: 1,
      },
    });
    const modifiedData = data["genres"].map((g) => ({
      id: g["id"],
      name: g["name"],
    }));
    return modifiedData;
  } catch (error) {}
};

export const fetchMovieByGenre = async (genre_id) => {
  try {
    const { data } = await axios.get(moviesUrl, {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
        language: "en_US",
        page: 1,
        with_genres: genre_id,
      },
    });
    const posterUrl = "https://image.tmdb.org/t/p/original/";
    const modifiedData = data["results"].map((m) => ({
      id: m["id"],
      backPoster: posterUrl + m["backdrop_path"],
      popularity: m["popularith"],
      title: m["title"],
      poster: posterUrl + m["poster_path"],
      overview: m["overview"],
      rating: m["vote_average"],
    }));

    return modifiedData;
  } catch (error) {}
};

export const fetchPersons = async () => {
  try {
    const { data } = await axios.get(personUrl, {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
      },
    });
    const modifiedData = data["results"].map((p) => ({
      id: p["id"],
      popularity: p["popularity"],
      name: p["name"],
      profileImg: "https://image.tmdb.org/t/p/w200" + p["profile_path"],
      known: p["known_for_department"],
    }));
    return modifiedData;
  } catch (error) {
    console.log(error);
  }
};

export const fetchTopratedMovie = async () => {
  try {
    const { data } = await axios.get(topratedUrl, {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
        language: "en_US",
        page: 1,
      },
    });
    const posterUrl = "https://image.tmdb.org/t/p/original/";
    const modifiedData = data["results"].map((m) => ({
      id: m["id"],
      backPoster: posterUrl + m["backdrop_path"],
      popularity: m["popularith"],
      title: m["title"],
      poster: posterUrl + m["poster_path"],
      overview: m["overview"],
      rating: m["vote_average"],
    }));

    return modifiedData;
  } catch (error) {}
};

export const fetchMovieDetail = async (id) => {
  try {
    const { data } = await axios.get(`${movieUrl}/${id}`, {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
        language: "en_US",
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchMovieVideos = async (id) => {
  try {
    const { data } = await axios.get(`${movieUrl}/${id}/videos`, {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
      },
    });
    return data["results"][0];
  } catch (error) {
    console.log(error);
  }
};

export const fetchMovieImages = async (id) => {
  try {
    const { data } = await axios.get(`${movieUrl}/${id}/images`, {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
      },
    });

    return data.backdrops;
  } catch (error) {
    console.log(error);
  }
};

export const fetchMoviePoster = async (id) => {
  try {
    const { data } = await axios.get(`${movieUrl}/${id}/images`, {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
      },
    });

    console.log(data.posters);
    return data.posters;
  } catch (error) {
    console.log(error);
  }
};

export const fetchCasts = async (id) => {
  try {
    const { data } = await axios.get(`${movieUrl}/${id}/credits`, {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
      },
    });
    const modifiedData = data["cast"].map((c) => ({
      id: c["cast_id"],
      character: c["character"],
      name: c["name"],
      img: "https://image.tmdb.org/t/p/w200" + c["profile_path"],
    }));

    return modifiedData;
  } catch (error) {}
};

export const fetchCrew = async (id) => {
  try {
    const { data } = await axios.get(`${movieUrl}/${id}/credits`, {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
      },
    });
    console.log(data.crew);
    return data.crew;
  } catch (error) {
    console.log(error);
  }
};

export const fetchSimilarMovie = async (id) => {
  try {
    const { data } = await axios.get(`${movieUrl}/${id}/similar`, {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
        language: "en_US",
      },
    });
    const posterUrl = "https://image.tmdb.org/t/p/original/";
    const modifiedData = data["results"].map((m) => ({
      id: m["id"],
      backPoster: posterUrl + m["backdrop_path"],
      popularity: m["popularith"],
      title: m["title"],
      poster: posterUrl + m["poster_path"],
      overview: m["overview"],
      rating: m["vote_average"],
    }));

    return modifiedData;
  } catch (error) {}
};

export const fetchNetflixOriginals = async () => {
  try {
    const { data } = await axios.get(`${netflixOriginalsUrl}`, {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
        with_networks: 123,
      },
    });
    const posterUrl = "https://image.tmdb.org/t/p/original/";
    const modifiedData = data["results"].map((m) => ({
      id: m["id"],
      backPoster: posterUrl + m["backdrop_path"],
      popularity: m["popularith"],
      title: m["title"],
      name: m["name"],
      poster: posterUrl + m["poster_path"],
      overview: m["overview"],
      rating: m["vote_average"],
    }));

    return modifiedData;
  } catch (error) {
    console.log(error);
  }
};

export const fetchComedyMovies = async () => {
  try {
    const { data } = await axios.get(`${comedyMovies}`, {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
        with_genres: 35,
      },
    });
    const posterUrl = "https://image.tmdb.org/t/p/original/";
    const modifiedData = data["results"].map((m) => ({
      id: m["id"],
      backPoster: posterUrl + m["backdrop_path"],
      popularity: m["popularith"],
      title: m["title"],
      name: m["name"],
      poster: posterUrl + m["poster_path"],
      overview: m["overview"],
      rating: m["vote_average"],
    }));

    return modifiedData;
  } catch (error) {
    console.log(error);
  }
};

export const fetchHorrorMovies = async () => {
  try {
    const { data } = await axios.get(`${horrorMovies}`, {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
        with_genres: 27,
      },
    });
    const posterUrl = "https://image.tmdb.org/t/p/original/";
    const modifiedData = data["results"].map((m) => ({
      id: m["id"],
      backPoster: posterUrl + m["backdrop_path"],
      popularity: m["popularith"],
      title: m["title"],
      name: m["name"],
      poster: posterUrl + m["poster_path"],
      overview: m["overview"],
      rating: m["vote_average"],
    }));

    return modifiedData;
  } catch (error) {
    console.log(error);
  }
};

export const fetchRomanceMovies = async () => {
  try {
    const { data } = await axios.get(`${romanceMovies}`, {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
        with_genres: 10749,
      },
    });
    const posterUrl = "https://image.tmdb.org/t/p/original/";
    const modifiedData = data["results"].map((m) => ({
      id: m["id"],
      backPoster: posterUrl + m["backdrop_path"],
      popularity: m["popularity"],
      title: m["title"],
      name: m["name"],
      poster: posterUrl + m["poster_path"],
      overview: m["overview"],
      rating: m["vote_average"],
    }));

    return modifiedData;
  } catch (error) {
    console.log(error);
  }
};

export const fetchDocumentaries = async () => {
  try {
    const { data } = await axios.get(`${documentaries}`, {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
        with_genres: 99,
      },
    });
    const posterUrl = "https://image.tmdb.org/t/p/original/";
    const modifiedData = data["results"].map((m) => ({
      id: m["id"],
      backPoster: posterUrl + m["backdrop_path"],
      popularity: m["popularity"],
      title: m["title"],
      name: m["name"],
      poster: posterUrl + m["poster_path"],
      overview: m["overview"],
      rating: m["vote_average"],
    }));

    return modifiedData;
  } catch (error) {
    console.log(error);
  }
};

// ----------------- TV Series ----------------- //

export const fetchSeriesDetail = async (id) => {
  try {
    const { data } = await axios.get(`${seriesUrl}/${id}`, {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
        language: "en_US",
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchSeriesVideos = async (id) => {
  try {
    const { data } = await axios.get(`${seriesUrl}/${id}/videos`, {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
      },
    });
    return data["results"][0];
  } catch (error) {
    console.log(error);
  }
};

export const fetchSeriesImages = async (id) => {
  try {
    const { data } = await axios.get(`${seriesUrl}/${id}/images`, {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
      },
    });
    return data.backdrops;
  } catch (error) {
    console.log(error);
  }
};

export const fetchSeriesPoster = async (id) => {
  try {
    const { data } = await axios.get(`${seriesUrl}/${id}/images`, {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
      },
    });

    console.log(data.posters);
    return data.posters;
  } catch (error) {
    console.log(error);
  }
};

export const fetchSeriesCasts = async (id) => {
  try {
    const { data } = await axios.get(`${seriesUrl}/${id}/credits`, {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
      },
    });
    const modifiedData = data["cast"].map((c) => ({
      id: c["cast_id"],
      character: c["character"],
      name: c["name"],
      img: "https://image.tmdb.org/t/p/w200" + c["profile_path"],
    }));

    return modifiedData;
  } catch (error) {}
};

export const fetchSimilarSeries = async (id) => {
  try {
    const { data } = await axios.get(`${seriesUrl}/${id}/similar`, {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
        language: "en_US",
      },
    });
    const posterUrl = "https://image.tmdb.org/t/p/original/";
    const modifiedData = data["results"].map((m) => ({
      id: m["id"],
      backPoster: posterUrl + m["backdrop_path"],
      popularity: m["popularith"],
      title: m["original_name"],
      poster: posterUrl + m["poster_path"],
      overview: m["overview"],
      rating: m["vote_average"],
    }));

    return modifiedData;
  } catch (error) {}
};
