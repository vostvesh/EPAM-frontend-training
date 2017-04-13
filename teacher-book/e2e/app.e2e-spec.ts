import { TeacherBookPage } from './app.po';

describe('teacher-book App', () => {
  let page: TeacherBookPage;

  beforeEach(() => {
    page = new TeacherBookPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
