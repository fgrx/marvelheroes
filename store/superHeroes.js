import { getCredentials } from '../app.config.js'

export const state = () => ({
  superHeroes: []
})

export const mutations = {
  ADD_HERO(state, hero) {
    state.superHeroes.push(hero)
  }
}

export const getters = {
  getSuperHeroes: (state) => {
    return state.superHeroes
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

    // Mise à jour du store
    window.localStorage.clear()
    window.localStorage.setItem('heroes', JSON.stringify(heroes))

    heroes.forEach((hero) => {
      commit('ADD_HERO', hero)
    })
  },
  async fetchHero({ commit }, characterId) {
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

    return result.data.data.results[0]
  }
}
