import { mutations } from '../../store/superHeroes.js'

const { ADD_HERO } = mutations

describe('mutations', () => {
  test('ADD_HERO', () => {
    // mock state
    const state = { superHeroes: {} }
    const Hero = { name: 'Batman', description: 'not a marvel hero' }
    // apply mutation
    ADD_HERO(state, Hero)
    // assert result
    expect(state.superHeroes).to.toContain(Hero)
  })
})
