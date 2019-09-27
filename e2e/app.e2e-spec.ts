import {BlankPage, HeroesListPage, HeroPage} from './app.po';
import {$, browser, by, element, protractor} from 'protractor';


describe('blank App', () => {
  let page: BlankPage;
  let hero: HeroPage;
  let heroes: HeroesListPage;
  let firstHeroName =  'Narco';
  let newName = 'Test';
  let heroForDelete = 'Celeritas';
  let heroForAdding = 'NewHero';
  let baseUrl = 'http://localhost:4200/';


  beforeEach(() => {
    page = new BlankPage();
    hero = new HeroPage();
    heroes = new HeroesListPage();
    page.navigateTo();
  });

  it('should display message saying app works', () => {
    expect(page.getParagraphText()).toEqual('Tour of Heroes');
  });
  it('should display four top heroes at start', () => {
    expect(page.getNumberOfTopHeroes().count()).toBe(4);
  });
  it('id of the hero should be equal id in the url on hero detailed page', () => {
    page.getNameOfFirstHero().click();
    hero.getHeroId().then(function (id) {
      expect(browser.getCurrentUrl()).toEqual(baseUrl + 'detail/' + id);
    });
  });
  it('name of the first hero in heroes list should be ' + firstHeroName, () => {
    expect(page.getNameOfFirstHero()).toEqual(firstHeroName);
  });
  it('name of the hero should be saved after changes on blank and My Heroes page', () => {
    expect(page.getNameOfFirstHero()).toEqual(firstHeroName);
    page.getNameOfFirstHero().click();
    expect(hero.getDetailsText()).toEqual(firstHeroName + ' details!');
    hero.getHeroNameInputFiled().clear();
    hero.getHeroNameInputFiled().sendKeys(newName);
    expect(hero.getDetailsText()).toEqual(newName + ' details!');
    hero.clickButtonByText('Save');
    expect(page.getNameOfFirstHero()).toEqual(newName);
    page.clickLinkByText('Heroes');
    expect(heroes.getNameOfHeroByIndex(1)).toEqual(newName);
  });
  // it('name of the hero does not saved if save button not clicked', () => {
  //   expect(page.getNameOfFirstHero()).toEqual(firstHeroName);
  //   page.getNameOfFirstHero().click();
  //   expect(hero.getDetailsText()).toEqual(firstHeroName + ' details!');
  //   hero.getHeroNameInputFiled().clear();
  //   hero.getHeroNameInputFiled().sendKeys(newName);
  //   expect(hero.getDetailsText()).toEqual(newName + ' details!');
  //   hero.clickButtonByText('Back');
  //   expect(page.getNameOfFirstHero()).toEqual(firstHeroName);
  // });
  it('number of heroes on My Heroes page should be 10', () => {
    page.clickLinkByText('Heroes');
    expect(heroes.getHeroes().count()).toEqual(10);
  });
  it('second hero on My Heroes page should be ' + firstHeroName, () => {
    page.clickLinkByText('Heroes');
    expect(heroes.getNameOfHeroByIndex(1)).toEqual(firstHeroName);
  });
  it('after deleting ' + heroForDelete + ' hero on My Heroes page, it should disappear from My heroes and blank pages', () => {
    expect(page.getHeroByNameOnHomePage(heroForDelete).isPresent()).toBe(true);
    page.clickLinkByText('Heroes');
    heroes.deleteHeroByName(heroForDelete);
    expect(heroes.getHeroByName(heroForDelete).isPresent()).toBe(false);
    heroes.clickLinkByText('Dashboard');
    expect(page.getHeroByNameOnHomePage(heroForDelete).isPresent()).toBe(false);
  });
  it('after deleting ' + heroForDelete + ' hero on My Heroes page, he should disappear from My heroes and blank pages', () => {
    expect(page.getHeroByNameOnHomePage(heroForDelete).isPresent()).toBe(true);
    page.clickLinkByText('Heroes');
    heroes.deleteHeroByName(heroForDelete);
    expect(heroes.getHeroByName(heroForDelete).isPresent()).toBe(false);
    heroes.clickLinkByText('Dashboard');
    expect(page.getHeroByNameOnHomePage(heroForDelete).isPresent()).toBe(false);
  });
  it('after adding new hero he should appear in heroes list', () => {
    page.clickLinkByText('Heroes');
    heroes.clickButtonByText('Add New Hero');
    heroes.getHeroNameInputFiled().sendKeys(heroForAdding);
    expect(heroes.getDetailsText()).toEqual(heroForAdding + ' details!');
    heroes.clickButtonByText('Save');
    expect(heroes.getHeroByName(heroForAdding).isPresent()).toBe(true);
  });
});
