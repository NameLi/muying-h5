const state = {
    actor: localStorage.getItem('actor') ? JSON.parse(localStorage.getItem('actor')) : {},
}

const getters = {
    getActor: state => state.actor,
}

const mutations = {
    SET_ACTOR: (state, actor) => {
        state.actor = actor
        localStorage.setItem('actor', JSON.stringify(actor))
    },
}

export default {
    namespaced: false,
    state,
    mutations,
    getters
}
