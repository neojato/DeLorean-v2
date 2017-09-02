import { DeLoreanPage } from './app.po';

describe('de-lorean App', () => {
  let page: DeLoreanPage;

  beforeEach(() => {
    page = new DeLoreanPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
