import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import movie from './modules/movie'
import actor from './modules/actor'
Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		user,
		movie,
		actor
	}
})