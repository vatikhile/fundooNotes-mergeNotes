import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  clickLink() {
    return element(by.xpath('//span[@class="mat-button-wrapper"]')).click();
  }
  getEmailId() {
    return element(by.xpath('//input[@id="mat-input-7"]')).sendKeys('vaibhawatikhile@gmail.com');

  }
  getPassword() {
    return element(by.xpath('//input[@id="mat-input-8"]')).sendKeys('Vaibhaw@1234');

  }
  clickVisibilityButton() {
    return element(by.xpath('//mat-icon[@class="mat-icon notranslate material-icons mat-icon-no-color"]')).click();

  }
  clickNextButton() {
    return element(by.xpath('//button[@class="button mat-raised-button mat-primary"]')).click();

  }
  clickCreateAccount() {

    return element(by.xpath('//mat-card-content[@class="mat-card-content"]//div//div//div//button[@class="outline mat-button mat-primary"]')).click();
  }

  //input[@id='mat-input-3']
  //input[@id='mat-input-4']
  //input[@id='mat-input-5']
  //input[@id='mat-input-6']
  //button[@class='button mat-raised-button mat-primary']
  getFirstName() {
    return element(by.xpath(' //input[@id="mat-input-2"]')).sendKeys('Amit');

  }
  getLastName() {
    return element(by.xpath(' //input[@id="mat-input-3"]')).sendKeys('Jain');

  }
  getUserName() {
    return element(by.xpath(' //input[@id="mat-input-4"]')).sendKeys('amitjain@gmail.com');

  }
  getPasswords() {
    return element(by.xpath(' //input[@id="mat-input-5"]')).sendKeys('amit@1234');

  }
  getConfirmPassword() {
    return element(by.xpath(' //input[@id="mat-input-6"]')).sendKeys('amit@1234');

  }
  clickNext() {
    return element(by.xpath('  //button[@class="button mat-raised-button mat-primary"]')).click();

  }
  clickSignIn() {
    return element(by.xpath('   //button[@class="color mat-button mat-primary"]')).click();

  }

}
