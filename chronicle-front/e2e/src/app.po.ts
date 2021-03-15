import { browser, by, element } from 'protractor';

export class AppPage {

  private credentials = {
    email: 'g@g.com',
    password: 'test123'
  };

  async navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl);
  }

  async getTitleText(): Promise<string> {
    return element(by.css('app-root h1')).getText();
  }

    // Authentication Test
   async fillCredentials(credentias: any = this.credentials) {
      element(by.css('[name="email"]')).sendKeys(credentias.email);
      element(by.css('.firebaseui-id-submit')).click();
      element(by.css('[name="password"]')).sendKeys(credentias.password);
      element(by.css('.firebaseui-id-submit')).click();
    }

    async getAuthPage(): Promise<string> {
      return element(by.css('app-root .page-title')).getText();
    }
}
