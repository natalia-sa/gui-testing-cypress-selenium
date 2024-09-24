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
  it('Checking confirmation message before deleting', () => {
    cy.clickInFirst('a[href="/admin/product-association-types/"]');
    cy.get('input.bulk-select-checkbox').check();
    cy.get('button.ui.red.labeled.icon.button').first().click();
    cy.get('body').should('contain', 'Confirm your action');
  });
  it('Create association without name', () => {
    cy.clickInFirst('a[href="/admin/product-association-types/"]');
    cy.get('a[href="/admin/product-association-types/new"]').click();
    cy.get('[id="sylius_product_association_type_code"]').type('may-association');
    cy.get('*[class^="ui labeled icon primary button"]').click();
    cy.get('body').should('contain', 'Error');
  });
  it('Create association without code', () => {
    cy.clickInFirst('a[href="/admin/product-association-types/"]');
    cy.get('a[href="/admin/product-association-types/new"]').click();
    cy.get('[id="sylius_product_association_type_translations_en_US_name"]').type('may-code');
    cy.get('*[class^="ui labeled icon primary button"]').click();
    cy.get('body').should('contain', 'Error');
  });
  it('Clear filters', () => {
    cy.clickInFirst('a[href="/admin/product-association-types/"]');
    cy.get('[id="criteria_name_value"]').type('Similar');
    cy.contains('a', 'Clear filters').click();
    cy.get('[id="criteria_name_value"]').should('have.value', '');
  });
  it('Filter associations with association name that does not exist', () => {
    cy.clickInFirst('a[href="/admin/product-association-types/"]');
    cy.get('[id="criteria_name_value"]').type('nothing');
    cy.get('*[class^="ui blue labeled icon button"]').click();
    cy.get('body').should('contain', 'There are no results to display');
  });
  it('Create association that already exists', () => {
    cy.clickInFirst('a[href="/admin/product-association-types/"]');
    cy.get('a[href="/admin/product-association-types/new"]').click();
    cy.get('[id="sylius_product_association_type_code"]').type('similar_products');
    cy.get('[id="sylius_product_association_type_translations_en_US_name"]').type('Real similar products');
    cy.get('*[class^="ui labeled icon primary button"]').click();
    cy.get('body').should('contain', 'The association type with given code already exists.');
  });
  it('Filter with name in upper case', () => {
    cy.clickInFirst('a[href="/admin/product-association-types/"]');
    cy.get('[id="criteria_name_value"]').type('REAL');
    cy.get('*[class^="ui blue labeled icon button"]').click();
    cy.get('body').should('contain', 'Real similar products');
  });
  it('Filter with not contains', () => {
    cy.clickInFirst('a[href="/admin/product-association-types/"]');
    cy.get('[id="criteria_code_type"]').select('Not contains');
    cy.get('[id="criteria_code_value"]').type('similar');
    cy.get('*[class^="ui blue labeled icon button"]').click();
    cy.get('body').should('contain', 'There are no results to display');
  });

});
