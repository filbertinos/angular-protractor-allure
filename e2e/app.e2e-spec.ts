import {$, browser, by, element, protractor} from 'protractor';
import {BlankPage} from './page_objects/blank.po';
import {HeroPage} from './page_objects/hero.po';
import {HeroesListPage} from './page_objects/heroes.po';
import {testData} from './test-data';
const using = require('jasmine-data-provider');


describe('blank App', () => {
  let page: BlankPage;
  let hero: HeroPage;
  let heroes: HeroesListPage;


  beforeEach(() => {
    page = new BlankPage();
    hero = new HeroPage();
    heroes = new HeroesListPage();
    allure.createStep('Opening main page', function(){
      page.navigateTo();
    })();
  });

  it('should display message saying app works', () => {
    expect(page.getParagraphText()).toEqual('Tour of Heroes');
  });
  it('should display four top heroes at start', () => {
    expect(page.getNumberOfTopHeroes().count()).toEqual(4);
  });
  it('id of the hero should be equal id in the url on hero detailed page', () => {
    page.clickOnFirstHero();
    hero.getHeroId().then(function (id) {
      expect(browser.getCurrentUrl()).toEqual(testData.baseUrl + 'detail/' + id);
    });
  });
  it('name of the first hero in heroes list should be ' + testData.firstHeroName, () => {
    expect(page.getNameOfFirstHero()).toEqual(testData.firstHeroName);
  });
  it('name of the hero should be saved after changes on blank and My Heroes page', () => {
    expect(page.getNameOfFirstHero()).toEqual(testData.firstHeroName);
    page.clickOnFirstHero();
    expect(hero.getDetailsText()).toEqual(testData.firstHeroName + ' details!');
    hero.clearNameField();
    hero.fillNameField(testData.newName);
    expect(hero.getDetailsText()).toEqual(testData.newName + ' details!');
    hero.clickButtonByText('Save');
    expect(page.getNameOfFirstHero()).toEqual(testData.newName);
    page.clickLinkByText('Heroes');
    expect(heroes.getNameOfHeroByIndex(1)).toEqual(testData.newName);
  });
  it('number of heroes on My Heroes page should be 10', () => {
    page.clickLinkByText('Heroes');
    expect(heroes.getHeroes().count()).toEqual(10);
  });
  it('second hero on My Heroes page should be ' + testData.firstHeroName, () => {
    page.clickLinkByText('Heroes');
    expect(heroes.getNameOfHeroByIndex(1)).toEqual(testData.firstHeroName);
  });
  it('after deleting ' + testData.heroForDelete + ' hero on My Heroes page, he should disappear from My heroes and blank pages', () => {
    expect(page.getHeroByNameOnHomePage(testData.heroForDelete).isPresent()).toBe(true);
    page.clickLinkByText('Heroes');
    heroes.deleteHeroByName(testData.heroForDelete);
    expect(heroes.getHeroByName(testData.heroForDelete).isPresent()).toBe(false);
    heroes.clickLinkByText('Dashboard');
    expect(page.getHeroByNameOnHomePage(testData.heroForDelete).isPresent()).toBe(false);
  });
  it('after adding new hero with name ' + testData.heroForAdding  + ', he should appear in heroes list', () => {
    heroes.createHero(testData.heroForAdding);
    expect(heroes.getHeroByName(testData.heroForAdding).isPresent()).toBe(true);
  });
  it('after selecting hero at the My Heroes page, inscription about selection should appear', () => {
    page.clickLinkByText('Heroes');
    heroes.getHeroByName(testData.heroForSelection).click();
    expect(heroes.getSelectionText(testData.heroForSelection).isPresent()).toBe(true);
  });
  it('\'View details\' button for selected hero should navigate to correct hero details page', () => {
    page.clickLinkByText('Heroes');
    heroes.getHeroByName(testData.heroForSelection).click();
    heroes.clickButtonByText('View Details');
    expect(hero.getDetailsText()).toEqual(testData.heroForSelection + ' details!');
    expect(hero.getHeroNameInputFiled().getAttribute('value')).toEqual(testData.heroForSelection);
  });
  it('existing hero should appear in search results', () => {
    page.searchHeroByName(testData.heroForDelete);
    expect(page.getSearchResults().get(0).getText()).toEqual(testData.heroForDelete);
  });
  it('After deletion ' + testData.heroForDelete + ' hero shouldn\'t appear in search results', () => {
    page.clickLinkByText('Heroes');
    heroes.deleteHeroByName(testData.heroForDelete);
    expect(heroes.getHeroByName(testData.heroForDelete).isPresent()).toBe(false);
    heroes.clickLinkByText('Dashboard');
    page.searchHeroByName(testData.heroForDelete);
    expect(page.getSearchResults().get(0).isPresent()).toBe(false);
  });
  using(testData.heroesForCreation, function (data) {
    it('after adding new hero with name ' + data.name + ', he should appear in heroes list', () => {
      heroes.createHero(data.name);
      expect(heroes.getHeroByName(data.name).isPresent()).toBe(data.assert);
    });
  });
});
