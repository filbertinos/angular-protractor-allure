import {by, element} from 'protractor';
import {Navigation} from './common-nav.po';

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
