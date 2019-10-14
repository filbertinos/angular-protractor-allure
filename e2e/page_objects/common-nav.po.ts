import {browser, by, element} from 'protractor';

export class Navigation {
  public clickButtonByText(button: string) {
  allure.createStep('Click \'' + button + '\' button' , function(){
    element(by.buttonText(button)).click();
    browser.waitForAngular();
  })();
  }
  public clickLinkByText(link: string) {
    allure.createStep('Click \'' + link + '\' link' , function(){
      element(by.linkText(link)).click();
      browser.waitForAngular();
    })();
  }
}
