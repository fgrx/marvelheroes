<template>
  <v-container>
    <div class="text-center">
      <v-progress-circular
        :size="100"
        color="primary"
        indeterminate
      ></v-progress-circular>
      <p>Loading...</p>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'loading',
  mount() {
    console.log('coucou loading')
  }
}
</script>
