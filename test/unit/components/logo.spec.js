import { mount } from '@vue/test-utils'
import logo from '@/components/logo.vue'

describe('Logo Marvel', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(logo)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
