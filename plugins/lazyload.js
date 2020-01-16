import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
import loadingImage from '~/assets/img/loadingSpinner.svg'

Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: loadingImage,
  attempt: 1
})
