import { PageRepo } from "../journal/page_repo";
import SessionObject from "./session_object";

export default class SessionFacade {
  private user: string;
  private campaign: string;
  constructor({ user, campaign }: { user: string; campaign: string }) {
    this.user = user;
    this.campaign = campaign;
  }
  // NOTE using the repo directly may be an antipattern
  public getSessionItems = () =>
    PageRepo.findisPinned(this.campaign)
      .then(pages => new SessionObject(pages).getSessionItems())
      .then(session => {
        return session;
      });

  public addPage = (page: string) =>
    PageRepo.addToSession(page).then(() => page);

  public removePage = (page: string) =>
    PageRepo.removeFromSession(page).then(() => page);
}
