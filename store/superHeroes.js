import { getCredentials } from '../app.config.js'

export const state = () => ({
  superHeroes: [],
  favoritesHeros: []
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
      state.favoritesHeros = state.favoritesHeros.filter(
        (heroTarget) => heroTarget.id !== hero.id
      )

    // Sauvegarde dans le localstore
    window.localStorage.setItem(
      'favoritesHeros',
      JSON.stringify(state.favoritesHeros)
    )
  }
}

export const getters = {
  getSuperHeroes: (state) => {
    return state.superHeroes
  },
  getFavoritesHeroes: (state) => {
    return state.favoritesHeros
  }
}

export const actions = {
  async fetchSuperHeroes({ commit, getters }, params) {
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

    // Mise à jour du store dans le localstorage
    window.localStorage.setItem('heroes', JSON.stringify(heroes))
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
  }
}
