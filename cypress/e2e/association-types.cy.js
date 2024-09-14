describe('association types', () => {
  beforeEach(() => {
    cy.visit('/admin');
    cy.get('[id="_username"]').type('sylius');
    cy.get('[id="_password"]').type('sylius');
    cy.get('.primary').click();
  });
  // Remove .only and implement others test cases!
  it('edit name of similar products', () => {
    // Click in association types in side menu
    cy.clickInFirst('a[href="/admin/product-association-types/"]');
    // Type in value input to search for specify association type
    cy.get('[id="criteria_name_value"]').type('Similar');
    // Click in filter blue button
    cy.get('*[class^="ui blue labeled icon button"]').click();
    // Click in edit of the remain association type
    cy.get('*[class^="ui labeled icon button "]').last().click();
    // Edit association type name
    cy.get('[id="sylius_product_association_type_translations_en_US_name"]').clear().type('Real similar products');
    // Click on Save changes button
    cy.get('[id="sylius_save_changes_button"]').scrollIntoView().click();

    // Assert that association type name has been updated
    cy.get('body').should('contain', 'Product association type has been successfully updated.');
  });
  it('Cancel association before creating it', () => {
    cy.clickInFirst('a[href="/admin/product-association-types/"]');
    cy.get('a[href="/admin/product-association-types/new"]').click();
    cy.get('[id="sylius_product_association_type_code"]').type('may-association');
    cy.contains('Cancel').click();
    cy.url().should('include', '/admin/product-association-types/');
  });
  it('test case 3', () => {
    // Implement your test case 3 code here
  });
  it('test case 4', () => {
    // Implement your test case 3 code here
  });
  it('test case 5', () => {
    // Implement your test case 3 code here
  });
  it('test case 6', () => {
    // Implement your test case 3 code here
  });
  it('test case 7', () => {
    // Implement your test case 3 code here
  });
  it('test case 8', () => {
    // Implement your test case 3 code here
  });
  it('test case 9', () => {
    // Implement your test case 3 code here
  });
  it('test case 10', () => {
    // Implement your test case 3 code here
  });

  // Implement the remaining test cases in a similar manner
});
