<template>
  <div>
    <v-btn class="top-button" fab dark color="primary" absolute top left to="/">
      <v-icon dark>mdi-arrow-left</v-icon></v-btn
    >

    <v-card>
      <v-container fluid grid-list-md>
        <v-layout row wrap>
          <loading v-if="loading" />
          <div v-if="!loading">
            <h1>{{ hero.name }}</h1>
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
                <div class="numberOfComics" v-if="hero.comics.available">
                  Comics available : {{ hero.comics.available }}
                </div>
                <div class="lastcomics">
                  <ul>
                    <li v-for="comic in hero.comics.items">
                      {{ comic.name }}
                    </li>
                  </ul>
                </div>

                <div class="description" v-if="hero.description">
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
      loading: true
    }
  },
  async mounted() {
    this.hero = await this.$store.dispatch(
      'superHeroes/retrieveHero',
      this.$route.params.id
    )
    console.log('mon hero', this.hero.thumbnail.path)
    this.loading = false
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
