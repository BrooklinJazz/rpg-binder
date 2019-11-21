import { IPage } from "../types";
import { SectionRepo } from "../journal/section_repo";

export default class SessionObject {
  public sessionPages: IPage[];
  constructor(sessionPages: IPage[]) {
    this.sessionPages = sessionPages;
  }

  public getSessionItems() {
    const sectionIds = Array.from(
      new Set(this.sessionPages.map(page => page.section))
    );
    return SectionRepo.findByIds(sectionIds).then(sections =>
      sections.map(section => {
        return {
          section,
          pages: this.sessionPages.filter(page => page.section.toString() === section._id.toString());
        };
      })
    );
  }
}
