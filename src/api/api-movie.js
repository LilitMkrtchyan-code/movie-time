class OMDBApi {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = "https://www.omdbapi.com/";
  }

  async fetchByID(id) {
    try {
      const response = await fetch(
        `${this.baseUrl}?i=${id}&apikey=${this.apiKey}`
      );
      const data = await response.json();
      return {
        success: data.Response === "True",
        data,
        error: data.Response === "True" ? null : data.Error,
      };
    } catch (error) {
      return { success: false, data: null, error: error.message };
    }
  }

  async fetchMoviesBySearch(query, page = 1, type = "all") {
    try {
      const searchUrl = `${this.baseUrl}?s=${encodeURIComponent(
        query
      )}&page=${page}&apikey=${this.apiKey}${
        type !== "all" ? `&type=${type}` : ""
      }`;
      const response = await fetch(searchUrl);
      const data = await response.json();
      return {
        success: data.Response === "True",
        data: data,
        error: data.Response === "True" ? null : data.Error,
      };
    } catch (error) {
      return { success: false, data: [], error: error.message };
    }
  }
}

export const omdbApi = new OMDBApi("ea4822c1");
// const API_KEY = process.env.REACT_APP_API_KEY;
// const URL = `https://www.omdbapi.com/?apikey=${API_KEY}&s=`;
