describe('Smoke', () => {
  it('visit home page', () => {
    cy.visit('/')
    cy.findByRole('heading', { level: 2, name: 'Franck Boucher' })
  })
})
