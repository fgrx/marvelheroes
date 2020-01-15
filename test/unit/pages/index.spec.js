import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import IndexPage from '@/pages/index.vue'
import loading from '@/components/loading'

const localVue = createLocalVue()
localVue.use(Vuetify)

describe('Home', () => {
  it('Renders a SuperHeroes list ', () => {
    const wrapper = shallowMount(IndexPage, {
      localVue
    })
    console.log('wrapper : ', wrapper.html())
    expect(wrapper.html()).toContain('<h1>Marvel Super Heroes</h1>')
  })
})
