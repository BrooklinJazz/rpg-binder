"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var section_repo_1 = require("../journal/section_repo");
var SessionObject = /** @class */ (function () {
    function SessionObject(sessionPages) {
        var _this = this;
        this.sortPagesBySection = function (sections) {
            return sections.map(function (section) { return ({
                section: section,
                pages: _this.sessionPages.filter(function (page) { return page.section.toString() === section._id.toString(); })
            }); });
        };
        this.sessionPages = sessionPages;
    }
    SessionObject.prototype.getSessionItems = function () {
        var sectionIds = Array.from(new Set(this.sessionPages.map(function (page) { return page.section; })));
        return section_repo_1.SectionRepo.findByIds(sectionIds).then(this.sortPagesBySection);
    };
    return SessionObject;
}());
exports.default = SessionObject;
