import {by, element} from 'protractor';
import {Navigation} from './common-nav.po';

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
  getSelectionText(name: string) {
    return element(by.cssContainingText('h2', name.toUpperCase() + ' is my hero'));
  }
}
