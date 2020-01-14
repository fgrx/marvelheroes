<template>
  <v-app light>
    <v-content>
      <logo />
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer app>
      Fabien Grignoux -&nbsp;
      <a href="https://www.developpeurfullstack.fr">developpeurfullstack.fr</a>
    </v-footer>
  </v-app>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  }
}
</script>
