import {browser, element, by} from 'protractor';
import {Navigation} from './common-nav.po';
import {selector} from '../selectors';

export class BlankPage extends Navigation {
  paragraphTextLocator = element(by.css(selector.blank.paragraphText));
  numberOfHeroes = element.all(by.css(selector.blank.heroTag));
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
    browser.wait(EC.presenceOf(this.getNumberOfTopHeroes().first()), 2000);
    return this.getNumberOfTopHeroes().first().getText();
  }
  getHeroByNameOnHomePage(name: string) {
    return element(by.cssContainingText(selector.blank.heroTag, name));
  }
  searchHeroByName(name: string) {
    allure.createStep('Search for the ' + '\'name\'' + ' hero', function(){})();
    element(by.css(selector.blank.searchBox)).sendKeys(name);
  }
  getSearchResults() {
    return element.all(by.css(selector.blank.searchResult));
  }
  clickOnFirstHero() {
    allure.createStep('Click on first hero', function(){})();
    this.getNumberOfTopHeroes().first().click();
  }
}



