<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md8>
      <div class="text-center">
        <h1>Marvel Super Heroes</h1>
        <h2>Yes! these are b-sides heroes... But they are still cool !</h2>
      </div>

      <v-card>
        <v-container fluid grid-list-md>
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
    </v-flex>
  </v-layout>
</template>

<script>
import heroCard from '~/components/heroCard'
import loading from '~/components/loading'

export default {
  components: {
    heroCard,
    loading
  },
  data() {
    return {
      superHeroes: this.$store.state.superHeroes.superHeroes,
      loading: false,
      searchHeroesParams: {
        heroesListOffset: 100,
        nubmerOfHeroes: 24
      }
    }
  },
  async mounted() {
    if (this.$store.getters['superHeroes/getSuperHeroes'].length === 0) {
      this.loading = true
      await this.$store.dispatch(
        'superHeroes/fetchSuperHeroes',
        this.searchHeroesParams
      )
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
