import { mount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import { heroExample } from '~/test/unit/heroExample'
import HeroCard from '@/components/heroCard.vue'

const localVue = createLocalVue()
localVue.use(Vuetify, {})

describe('HeroCard component', () => {
  it('Renders a SuperHero Card', () => {
    const wrapper = mount(HeroCard, {
      localVue,
      stubs: ['nuxt-link'],
      propsData: {
        hero: heroExample
      }
    })

    expect(wrapper.html()).toContain('v-card')
    expect(wrapper.html()).toContain(heroExample.name)
  })
})
