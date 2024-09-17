const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('association types', () => {
  let driver;

  before(async () => {
    driver = await new Builder().forBrowser('firefox').build();
  });

  after(async () => {
    await driver.quit();
  });

  beforeEach(async () => {
    driver.manage().deleteAllCookies();
    await driver.get('http://localhost:9990/admin');
    // await driver.get('http://150.165.75.99:9990/admin');
    await driver.findElement(By.id('_username')).sendKeys('sylius');
    await driver.findElement(By.id('_password')).sendKeys('sylius');
    await driver.findElement(By.css('.primary')).click();
    // await driver.sleep(1000);
  });

  // Remove .only and implement others test cases!
  it('edit name of similar products', async () => {
    // Click in attributes in side menu
    await driver.findElement(By.linkText('Association types')).click();

    // Type in value input to search for specify association type
    await driver.findElement(By.id('criteria_name_value')).sendKeys('Similar');

    // Click in filter blue button
    await driver.findElement(By.css('*[class^="ui blue labeled icon button"]')).click();

    // Click in edit of the remain association type
    const buttons = await driver.findElements(By.css('*[class^="ui labeled icon button "]'));
    await buttons[1].click();

    // Edit association type name
    const inputName = await driver.findElement(By.id('sylius_product_association_type_translations_en_US_name'));
    inputName.click();
    inputName.clear();
    inputName.sendKeys('Real similar products');

    // Click on Save changes button
    await driver.findElement(By.id('sylius_save_changes_button')).click();

    // Assert that association type name has been updated
    const bodyText = await driver.findElement(By.css('body')).getText();
    assert(bodyText.includes('Product association type has been successfully updated.'));
  });

  it('Cancel association before creating it', async () => {
    await driver.findElement(By.linkText('Association types')).click();
    await driver.findElement(By.css('a[href="/admin/product-association-types/new"]')).click();
    await driver.findElement(By.id('sylius_product_association_type_code')).sendKeys('may-association');
    await driver.findElement(By.linkText('Cancel')).click();
    const currentUrl = await driver.getCurrentUrl();
    assert(currentUrl.includes('/admin/product-association-types/'));
  });
  it('Checking confirmation message before deleting', async () => {
    await driver.findElement(By.linkText('Association types')).click();
    let checkbox = await driver.findElement(By.css('input.bulk-select-checkbox'));
    let isChecked = await checkbox.isSelected();
    if (!isChecked) {
        await checkbox.click();
    }
    const buttons = await driver.findElements(By.css('button.ui.red.labeled.icon.button'));
    await buttons[1].click();
    const bodyText = await driver.findElement(By.css('body')).getText();
    assert(bodyText.includes('Confirm your action'));
  });
  it('Create association without name', async () => {
    await driver.findElement(By.linkText('Association types')).click();
    await driver.findElement(By.css('a[href="/admin/product-association-types/new"]')).click();
    await driver.findElement(By.id('sylius_product_association_type_code')).sendKeys('may-association');
    await driver.findElement(By.css('*[class^="ui labeled icon primary button"]')).click();
    const bodyText = await driver.findElement(By.css('body')).getText();
    assert(bodyText.includes('Error'));
  });
  it('Create association without code', async () => {
    await driver.findElement(By.linkText('Association types')).click();
    await driver.findElement(By.css('a[href="/admin/product-association-types/new"]')).click();
    await driver.findElement(By.id('sylius_product_association_type_translations_en_US_name')).sendKeys('may-code');
    await driver.findElement(By.css('*[class^="ui labeled icon primary button"]')).click();
    const bodyText = await driver.findElement(By.css('body')).getText();
    assert(bodyText.includes('Error'));
  });
  it('Clear filters', async () => {
    await driver.findElement(By.linkText('Association types')).click();
    await driver.findElement(By.id('criteria_name_value')).sendKeys('Similar');
    await driver.findElement(By.linkText('Clear filters')).click();
    let inputField = await driver.findElement(By.id('criteria_name_value'));
    let value = await inputField.getAttribute('value');
    assert.strictEqual(value, '');
  });
  it('Filter associations with association name that does not exist', async () => {
    await driver.findElement(By.linkText('Association types')).click();
    await driver.findElement(By.id('criteria_name_value')).sendKeys('nothing');
    await driver.findElement(By.css('*[class^="ui blue labeled icon button"]')).click();
    const bodyText = await driver.findElement(By.css('body')).getText();
    assert(bodyText.includes('There are no results to display'));
  });
  it('Create association that already exists', async () => {
    await driver.findElement(By.linkText('Association types')).click();
    await driver.findElement(By.css('a[href="/admin/product-association-types/new"]')).click();
    await driver.findElement(By.id('sylius_product_association_type_code')).sendKeys('similar_products');
    await driver.findElement(By.id('sylius_product_association_type_translations_en_US_name')).sendKeys('Real similar products');
    await driver.findElement(By.css('*[class^="ui labeled icon primary button"]')).click();
    const bodyText = await driver.findElement(By.css('body')).getText();
    assert(bodyText.includes('The association type with given code already exists.'));
  });
  // it('Filter with name in upper case', async () => {
  //   await driver.findElement(By.linkText('Association types')).click();

  // });
  // it('Filter with not contains', async () => {
  //   await driver.findElement(By.linkText('Association types')).click();

  // });
});
