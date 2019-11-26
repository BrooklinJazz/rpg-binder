"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var page_repo_1 = require("../journal/page_repo");
var session_object_1 = __importDefault(require("./session_object"));
var SessionFacade = /** @class */ (function () {
    function SessionFacade(_a) {
        var _this = this;
        var user = _a.user, campaign = _a.campaign;
        // NOTE using the repo directly may be an antipattern
        this.getSessionItems = function () {
            return page_repo_1.PageRepo.findInSession(_this.campaign)
                .then(function (pages) { return new session_object_1.default(pages).getSessionItems(); })
                .then(function (session) {
                return session;
            });
        };
        this.addPage = function (page) {
            return page_repo_1.PageRepo.addToSession(page).then(function () { return page; });
        };
        this.removePage = function (page) {
            return page_repo_1.PageRepo.removeFromSession(page).then(function () { return page; });
        };
        this.user = user;
        this.campaign = campaign;
    }
    return SessionFacade;
}());
exports.default = SessionFacade;
