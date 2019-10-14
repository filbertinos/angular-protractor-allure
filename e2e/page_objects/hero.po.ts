import {browser, by, element} from 'protractor';
import {Navigation} from './common-nav.po';
import {selector} from '../selectors';

export class HeroPage extends Navigation {

  getHeroId() {
    return element(by.css(selector.hero.heroId)).getText();
  }

 public getHeroNameInputFiled() {
    return element(by.tagName(selector.inputTag));
  }

  getDetailsText() {
    return element(by.tagName(selector.detailsTag)).getText();
  }

  clearNameField(){
    allure.createStep('Clearing name field', function(){})();
    this.getHeroNameInputFiled().clear();
  }
  fillNameField(name: string) {
      allure.createStep('Filling name field with \'' + name + '\'' , function(){})();
      this.getHeroNameInputFiled().sendKeys(name);
  }
}
