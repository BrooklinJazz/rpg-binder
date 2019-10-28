import {
  IPageDocument,
  IPage,
  TPagesBySections,
  IPagesBySection
} from "./types";
import { PageRepo } from "./repo";

class PageBusinessObject {
  public page: IPage;
  private repo: PageRepo;
  constructor(page: IPage, repo: PageRepo) {
    this.repo = repo;
    this.page = page;
  }

  public async arrangeRelatedPagesBySection() {
    const relatedPages = await this.repo.findRelatedPages(this.page);

    const sortedPagesBySection: Promise<
      IPagesBySection[]
    > = relatedPages.reduce(
      async (pagesBySections, relatedPage) => {
        // see if sections is already in array
        const foundSection = await this.repo.findSection(relatedPage);
        const sectionIndex = pagesBySections.findIndex(
          pagesBySection => pagesBySection.section._id === relatedPage._id
        );
        const sectionFound = sectionIndex >= 0;
        // if section exists insert into section pages
        if (sectionFound) {
          return pagesBySections.map(({ section, pages }, index) =>
            index === sectionIndex
              ? { section, pages: [...pages, relatedPage] }
              : { section, pages }
          );
        } else {
          // else create section and insert into section pages
          return [
            ...pagesBySections,
            { section: foundSection, pages: [relatedPage] }
          ];
        }
      },
      [] as IPagesBySection[]
    );
    return await sortedPagesBySection;
  }
}
