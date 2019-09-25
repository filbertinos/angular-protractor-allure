import {browser, element, by} from 'protractor';

export class BlankPage {
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
  clickLinkByText(button: string) {
    element(by.linkText(button)).click();
  }
}

export class HeroPage {

  getHeroId() {
    return element(by.id('hero_id')).getText();
  }

  getHeroNameInputFiled() {
    return element(by.tagName('input'));
  }

  clickButtonByText(button: string) {
    element(by.buttonText(button)).click();
  }

  getDetailsText() {
    return element(by.tagName('h2')).getText();
  }
}

export class HeroesListPage {
  getHeroes() {
    return element.all(by.tagName('li'));
  }
  getNameOfHeroByIndex(index: number) {
    return this.getHeroes().all(by.css('.hero-element')).get(index).getText().then(function(nameOfHero) {
      return nameOfHero.split(' ')[1];
    });
  }
}
