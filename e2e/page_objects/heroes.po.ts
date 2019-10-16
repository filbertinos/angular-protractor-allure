import {by, element} from 'protractor';
import {Navigation} from './common-nav.po';
import {selector} from '../selectors';

export class HeroesListPage extends Navigation {
  getHeroes() {
    return element.all(by.tagName('li'));
  }
  getHeroNameInputFiled() {
    return element(by.tagName(selector.inputTag));
  }

  getDetailsText() {
    return element(by.cssContainingText(selector.detailsTag, 'details!')).getText();
  }
  getNameOfHeroByIndex(index: number) {
    return this.getHeroes().all(by.css(selector.heroes.heroElement)).get(index).getText().then(function(nameOfHero) {
      return nameOfHero.split(' ')[1];
    });
  }

  deleteHeroByName(name: string) {
    allure.createStep('Deleting hero by ' + '\'name\'', function(){})();
    this.getHeroByName(name).element(by.xpath('following-sibling::button')).click();
  }
  getHeroByName(name: string) {
    return element(by.cssContainingText(selector.heroes.heroElement, name));
  }
  getSelectionText(name: string) {
    return element(by.cssContainingText(selector.detailsTag, name.toUpperCase() + ' is my hero'));
  }
  createHero(name: string){
    this.clickLinkByText('Heroes');
    this.clickButtonByText('Add New Hero');
    this.getHeroNameInputFiled().sendKeys(name);
    expect(this.getDetailsText()).toEqual(name + ' details!');
    this.clickButtonByText('Save');
  }
}
