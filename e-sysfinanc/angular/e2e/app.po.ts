import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('body > app-root > section > mat-toolbar > span:nth-child(2)')).getText();
  }
}
