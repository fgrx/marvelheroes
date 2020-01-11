<template>
  <div>
    <v-card>
      <nuxt-link :to="{ name: 'hero-id', params: { id: hero.id } }">
        <v-img
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
          </h3>
        </div>
      </v-card-title>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ['hero']
}
</script>
