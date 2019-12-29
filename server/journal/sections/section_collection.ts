import SectionObject from "./section_object";
import { ISection } from "../../types";
import { tsImportEqualsDeclaration } from "@babel/types";

export default class SectionCollection {
  private sections: SectionObject[];
  constructor(sections: SectionObject[]) {
    this.sections = sections;
  }
  static fromSections(sections: ISection[]) {
    return Promise.all(
      sections.map(async each => await SectionObject.fromSection(each))
    ).then(sectionObjs => new SectionCollection(sectionObjs));
  }

  public getSortedSections() {
    return this.sections.sort((first, second) => (first.index || 0) - (second.index || 0));
  }

  public reorder(startIndex: number, endIndex: number) {
    let result = Array.from(this.getSortedSections());
    const existingIndex = result.findIndex(found => found.index === startIndex);
    const [removed] = result.splice(
      existingIndex !== -1 ? existingIndex : startIndex,
      1
    );
    result.splice(endIndex, 0, removed);
    this.sections = result;
    this.sections.map((section, index) => {
      section.index = index;
    });
    this.save();
  }

  public save() {
    return Promise.all(this.sections.map(section => section.save()));
  }
}
