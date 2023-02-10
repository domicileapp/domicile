import ChoresPage from './ChoresPage.vue'

describe('<ChoresPage />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(ChoresPage)
  })
})
