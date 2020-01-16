<template>
  <div>
    <v-card>
      <nuxt-link :to="{ name: 'hero-id', params: { id: hero.id } }">
        <v-img
          v-lazy
          :src="
            hero.thumbnail.path + '/portrait_medium.' + hero.thumbnail.extension
          "
          aspect-ratio="1"
        >
        </v-img>
      </nuxt-link>
      <v-card-title
        primary-title
        align="center"
        class="align-center justify-center"
      >
        <div class="card-top">
          <h3 class="headline mb-0 ">
            {{ hero.name }}
            <v-btn @click="setToFavs()"
              ><v-icon dark>{{ iconHeart }}</v-icon></v-btn
            >
          </h3>
        </div>
      </v-card-title>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ['hero'],
  data() {
    return {
      iconHeart: 'mdi-heart-outline',
      isFavorite: false
    }
  },
  mounted() {
    // Is this Hero in my favorite list ? if it is, i change the favorite button (heart button)
    const favoritesHeroes = this.$store.getters[
      'superHeroes/getFavoritesHeroes'
    ]

    if (favoritesHeroes.find((target) => target.id === this.hero.id)) {
      this.hero.isFavorite = true
      this.iconHeart = 'mdi-heart'
    }
  },
  methods: {
    setToFavs() {
      // Only 5 heroes allowed to be favorites
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
