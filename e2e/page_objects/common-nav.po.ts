import {browser, by, element} from 'protractor';

export class Navigation {
  public clickButtonByText(button: string) {
    element(by.buttonText(button)).click();
    browser.waitForAngular();
  }
  public clickLinkByText(button: string) {
    element(by.linkText(button)).click();
  }
}
