import { SntFrontEndPage } from './app.po';

describe('snt-front-end App', () => {
  let page: SntFrontEndPage;

  beforeEach(() => {
    page = new SntFrontEndPage();
  });

  it('should display welcome message', () => {
    return page.navigateTo().then(() => {
      expect(page.getParagraphText()).toEqual('Welcome to app!!');
    });
  });
});
