const state = {
  movie: localStorage.getItem('movie') ? JSON.parse(localStorage.getItem('movie')) : {},
}

const getters = {
  getMovie: state => state.movie,
}

const mutations = {
  SET_MOVIE: (state, movie) => {
    state.movie = movie
    localStorage.setItem('movie', JSON.stringify(movie))
  },
}

export default {
  namespaced: false,
  state,
  mutations,
  getters
}
