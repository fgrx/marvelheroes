const getCredentials = () => {
  const md5 = require('js-md5')

  const privateKey = 'a35fac4f14c1d750cc525d7bbb32db4b9606939a'
  const publicKey = 'cfbc23f403e4efeb1db18fef0a9123d7'
  const timestamp = new Date().getTime()

  const hash = md5(timestamp.toString() + privateKey + publicKey)

  return { publicKey, timestamp, hash }
}

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

    const urlApiMarvel = `https://gateway.marvel.com:443/v1/public/characters?limit=${params.nubmerOfHeroes}&offset=${params.heroesListOffset}`

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

    const heroes = result.data.data.results

    heroes.forEach((hero) => {
      commit('ADD_HERO', hero)
    })
  },
  async retrieveHero({ commit }, characterId) {
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
