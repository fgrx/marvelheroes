<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md8>
      <div class="text-center">
        <h1>Marvel Super Heroes</h1>
        <h2>Yes! these are b-sides heroes... But they are still cool !</h2>
      </div>

      <section>
        <v-card class="card-section" v-if="favoritesHeroes.length > 0">
          <v-container fluid grid-list-md>
            <h2>My favorites heroes</h2>
            <v-layout row wrap>
              <v-flex
                v-for="hero in favoritesHeroes"
                :key="hero.name"
                lg2
                md3
                xs4
              >
                <heroFavorite v-bind:hero="hero" />
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </section>

      <section>
        <v-card class="card-section">
          <v-container fluid grid-list-md>
            <h2>All heroes</h2>
            <v-layout row wrap>
              <v-flex v-for="hero in superHeroes" :key="hero.name" lg3 md4 xs6>
                <heroCard v-bind:hero="hero" />
              </v-flex>
              <loading v-if="loading" />
            </v-layout>
          </v-container>
        </v-card>
        <v-container>
          <div class="text-center">
            <v-btn @click="showMoreHeroes" color="primary"
              >Show more heroes</v-btn
            >
          </div>
        </v-container>
      </section>
    </v-flex>
  </v-layout>
</template>

<script>
import heroCard from '~/components/heroCard'
import heroFavorite from '~/components/heroFavorite'
import loading from '~/components/loading'

export default {
  components: {
    heroCard,
    heroFavorite,
    loading
  },
  data() {
    return {
      superHeroes: JSON.parse(window.localStorage.getItem('heroes')),
      favoritesHeroes: this.$store.getters['superHeroes/getFavoritesHeroes'],
      loading: false,
      searchHeroesParams: {
        heroesListOffset: 100,
        nubmerOfHeroes: 24
      }
    }
  },
  head() {
    return {
      title: 'Home of the Marvel Heroes browser',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Pick a hero to see all details'
        }
      ]
    }
  },
  async mounted() {
    if (this.$store.getters['superHeroes/getSuperHeroes'].length === 0) {
      this.loading = true
      await this.$store.dispatch(
        'superHeroes/fetchSuperHeroes',
        this.searchHeroesParams
      )

      this.superHeroes = this.$store.state.superHeroes.superHeroes
      this.loading = false
    }
  },
  methods: {
    async showMoreHeroes() {
      this.loading = true
      this.searchHeroesParams.heroesListOffset += this.searchHeroesParams.nubmerOfHeroes

      await this.$store.dispatch(
        'superHeroes/fetchSuperHeroes',
        this.searchHeroesParams
      )

      this.loading = false
    }
  }
}
</script>
