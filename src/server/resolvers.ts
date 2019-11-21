import campaign from "./campaign/campaign_resolver";
import journal from "./journal/journal_resolver";
import user from "./user/user_resolver";
import session from "./session/session_resolver";

export default [user, campaign, journal, session];
