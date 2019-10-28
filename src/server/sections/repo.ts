import { ISectionDocument } from "../sections/types";
import Section from "./model";
import { ISection } from "./types";
import { PageRepo } from "../pages/repo";
import { IPage } from "../pages/types";

export class SectionRepo {
    public async findById(id: string) {
        return await Section.findById(id);
    }
};