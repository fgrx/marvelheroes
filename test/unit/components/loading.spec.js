import { mount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import loading from '@/components/loading.vue'

const localVue = createLocalVue()
localVue.use(Vuetify, {})

describe('loading', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(loading, { localVue, stubs: ['nuxt-link'] })
    expect(wrapper.isVueInstance()).toBeTruthy()
    expect(wrapper.html()).toContain('v-progress-circular')
  })
})
