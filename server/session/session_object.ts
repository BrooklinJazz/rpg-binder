import { SectionRepo } from "../journal/sections/section_repo";
import { IPage, ISection } from "../types";

export default class SessionObject {
  public sessionPages: IPage[];
  constructor(sessionPages: IPage[]) {
    this.sessionPages = sessionPages;
  }

  private sortPagesBySection = (sections: ISection[]) => {
    return sections.map(section => ({
      section,
      pages: this.sessionPages.filter(
        page => page.section.toString() === section._id.toString()
      )
    }));
  };

  public getSessionItems() {
    const sectionIds = Array.from(
      new Set(this.sessionPages.map(page => page.section))
    );
    return SectionRepo.findByIds(sectionIds).then(this.sortPagesBySection);
  }
}
