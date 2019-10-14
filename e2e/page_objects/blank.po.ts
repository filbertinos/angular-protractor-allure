import {browser, element, by} from 'protractor';
import {Navigation} from './common-nav.po';

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
    browser.wait(EC.presenceOf(this.getNumberOfTopHeroes().all(by.css('h4')).first()), 2000);
    return this.getNumberOfTopHeroes().all(by.css('h4')).first().getText();
  }
  getHeroByNameOnHomePage(name: string) {
    return element(by.cssContainingText('h4', name));
  }
  searchHeroByName(name: string) {
    element(by.id('search-box')).sendKeys(name);
  }
  getSearchResults() {
    return element.all(by.css('.search-result'));
  }
}



