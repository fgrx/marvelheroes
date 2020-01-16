import { getCredentials } from '../app.config.js'

export const state = () => ({
  superHeroes: [],
  favoritesHeros: [],
  offset: 100
})

export const mutations = {
  ADD_HERO(state, hero) {
    state.superHeroes.push(hero)
  },
  SET_AS_FAVORITE(state, payload) {
    const { hero, isFavorite } = payload

    if (
      isFavorite === true &&
      !state.favoritesHeros.some((heroTarget) => heroTarget.id === hero.id)
    )
      state.favoritesHeros.push(hero)

    if (isFavorite === false)
      state.favoritesHeros.splice(state.favoritesHeros.indexOf(hero), 1)
  },
  SET_OFFSET(state, increment) {
    state.offset = increment
  }
}

export const getters = {
  getSuperHeroes: (state) => {
    return state.superHeroes
  },
  getFavoritesHeroes: (state) => {
    return state.favoritesHeros
  },
  getOffset: (state) => {
    return state.offset
  }
}

export const actions = {
  async fetchSuperHeroes({ commit }, params) {
    const credentials = getCredentials()

    const urlApiMarvel = `https://gateway.marvel.com:443/v1/public/characters`

    const result = await this.$axios({
      method: 'get',
      params: {
        apikey: credentials.publicKey,
        ts: credentials.timestamp,
        hash: credentials.hash,
        limit: params.nubmerOfHeroes,
        offset: params.heroesListOffset
      },
      url: urlApiMarvel
    })

    if (!result.status === 200) alert(`Une erreur a eu lieu : $(result.status)`)

    const heroes = result.data.data.results

    heroes.forEach((hero) => {
      commit('ADD_HERO', hero)
    })
  },
  async fetchHero({ state, getters }, characterId) {
    const credentials = getCredentials()

    const urlApiMarvel = `https://gateway.marvel.com:443/v1/public/characters/${characterId}?`

    const result = await this.$axios({
      method: 'get',
      params: {
        apikey: credentials.publicKey,
        ts: credentials.timestamp,
        hash: credentials.hash
      },
      url: urlApiMarvel
    })

    if (!result.status === 200) alert(`Une erreur a eu lieu : $(result.status)`)

    const hero = result.data.data.results[0]

    return hero
  },
  setToFavorites({ commit }, payload) {
    const { hero, isFavorite } = payload
    commit('SET_AS_FAVORITE', { hero, isFavorite })
  },
  setOffset({ commit }, increment) {
    commit('SET_OFFSET', increment)
  }
}
