import { Karaoke3Page } from './app.po';

describe('karaoke3 App', () => {
  let page: Karaoke3Page;

  beforeEach(() => {
    page = new Karaoke3Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
