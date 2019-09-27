import {browser, element, by} from 'protractor';
class Navigation {
  public clickButtonByText(button: string) {
    element(by.buttonText(button)).click();
  }
  public clickLinkByText(button: string) {
    element(by.linkText(button)).click();
  }
}
export class BlankPage extends Navigation {
  paragraphTextLocator = element(by.css('my-root h1'));
  numberOfHeroes = element.all(by.css('.hero'));
  navigateTo() {
    return browser.get('/');
  }
  getParagraphText() {
    return this.paragraphTextLocator.getText();
  }
  getNumberOfTopHeroes() {
    return this.numberOfHeroes;
  }
  getNameOfFirstHero() {
    browser.wait(EC.visibilityOf(this.getNumberOfTopHeroes().all(by.css('h4')).first()), 2000);
    return this.getNumberOfTopHeroes().all(by.css('h4')).first().getText();
  }
  getHeroByNameOnHomePage(name: string) {
    return element(by.cssContainingText('h4', name));
  }
}

export class HeroPage extends Navigation {

  getHeroId() {
    return element(by.id('hero_id')).getText();
  }

  getHeroNameInputFiled() {
    return element(by.tagName('input'));
  }

  getDetailsText() {
    return element(by.tagName('h2')).getText();
  }
}

export class HeroesListPage extends Navigation {
  getHeroes() {
    return element.all(by.tagName('li'));
  }
  getHeroNameInputFiled() {
    return element(by.tagName('input'));
  }

  getDetailsText() {
    return element(by.cssContainingText('h2', 'details!')).getText();
  }
  getNameOfHeroByIndex(index: number) {
    return this.getHeroes().all(by.css('.hero-element')).get(index).getText().then(function(nameOfHero) {
      return nameOfHero.split(' ')[1];
    });
  }

  deleteHeroByName(name: string) {
    element(by.cssContainingText('.hero-element', name)).element(by.xpath('following-sibling::button')).click();
  }
  getHeroByName(name: string) {
    return element(by.cssContainingText('.hero-element', name));
  }
}


