import { EventOrganizerPage } from './app.po';

describe('event-organizer App', () => {
  let page: EventOrganizerPage;

  beforeEach(() => {
    page = new EventOrganizerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
