<template>
  <div>
    <v-btn
      @click="backPage()"
      class="top-button"
      fab
      dark
      color="primary"
      absolute
      top
      left
    >
      <v-icon dark>mdi-arrow-left</v-icon></v-btn
    >

    <v-card>
      <v-container fluid grid-list-md>
        <v-layout row wrap>
          <loading v-if="loading" />
          <div v-if="!loading">
            <h1>
              <v-btn @click="setToFavs()"
                ><v-icon dark>{{ iconHeart }}</v-icon></v-btn
              >
              {{ hero.name }}
            </h1>
            <v-row>
              <v-col>
                <v-img
                  :src="
                    hero.thumbnail['path'] +
                      '/portrait_xlarge.' +
                      hero.thumbnail['extension']
                  "
                  aspect-ratio="1"
                  class="portrait"
                >
                </v-img>
              </v-col>
              <v-col>
                <div v-if="hero.comics.available" class="numberOfComics">
                  <strong>{{ hero.comics.available }} comics available</strong>
                  :
                </div>
                <div
                  v-if="Object.keys(lastTheeComics).length > 0"
                  class="lastcomics"
                >
                  <strong>Last 3 comics : </strong>
                  <ul>
                    <li v-for="comic in lastTheeComics">
                      {{ comic.name }}
                    </li>
                  </ul>
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <div v-if="hero.description" class="description">
                  <h3>Description</h3>
                  {{ hero.description }}
                </div>
              </v-col>
            </v-row>
          </div>
        </v-layout>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import loading from '~/components/loading'

export default {
  components: {
    loading
  },
  data() {
    return {
      hero: {},
      loading: true,
      lastTheeComics: {},
      iconHeart: 'mdi-heart-outline',
      isFavorite: false
    }
  },
  head() {
    return {
      title: this.hero.name,
      meta: [
        // hid est utilisé comme identifiant unique. N'utilisez pas `vmid` car ça ne fonctionnera pas
        {
          hid: 'description',
          name: 'description',
          content: `All details about ${this.hero.name}`
        }
      ]
    }
  },
  async mounted() {
    this.hero = await this.$store.dispatch(
      'superHeroes/fetchHero',
      this.$route.params.id
    )

    this.lastTheeComics = this.hero.comics.items.splice(0, 3)

    // Is this one of my favorite Hero ?
    const favoritesHeroes = this.$store.getters[
      'superHeroes/getFavoritesHeroes'
    ]

    if (favoritesHeroes.find((target) => target.id === this.hero.id))
      this.isFavorite = true

    this.iconHeart = this.isFavorite ? 'mdi-heart' : 'mdi-heart-outline'

    this.loading = false
  },
  methods: {
    backPage() {
      const numberOfEntries = window.history.length

      if (numberOfEntries > 2) {
        this.$router.back()
      } else {
        this.$router.push({ path: '/' })
      }
    },
    setToFavs() {
      const favoritesHeroes = this.$store.getters[
        'superHeroes/getFavoritesHeroes'
      ]

      if (favoritesHeroes.length >= 5 && this.isFavorite === false) {
        alert('You can only have 5 favorites heroes.')
      } else {
        this.isFavorite = !this.isFavorite

        this.$store.dispatch('superHeroes/setToFavorites', {
          hero: this.hero,
          isFavorite: this.isFavorite
        })

        this.iconHeart = this.isFavorite ? 'mdi-heart' : 'mdi-heart-outline'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.top-button {
  margin-top: 3.5em;
}

.portrait {
  border-radius: 50%;
}
</style>
