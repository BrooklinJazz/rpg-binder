import { IPage, ISection } from "../types";
import { PageRepo } from "./page_repo";
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
        const pages = this.sessionPages.filter(page => {
          console.log(page.section, section._id, page.section === section._id);
          return page.section.toString() === section._id.toString();
        });
        return {
          section,
          pages
        };
      })
    );
  }
}
