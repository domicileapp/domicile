import LoginLayout from './LoginLayout.vue'

describe('<LoginLayout />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(LoginLayout)
  })
})
