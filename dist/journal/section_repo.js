"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var section_model_1 = __importDefault(require("./section_model"));
var build = function (section) {
    return section && section.toObject();
};
var buildMany = function (sections) {
    return sections.map(build);
};
var SectionRepo = /** @class */ (function () {
    function SectionRepo() {
    }
    SectionRepo.findByCampaign = function (campaign) {
        return section_model_1.default.find({ campaign: campaign }).then(buildMany);
    };
    SectionRepo.findById = function (id) {
        return section_model_1.default.findById(id).then(build);
    };
    SectionRepo.findByIds = function (sectionIds) {
        return section_model_1.default.find({ _id: { $in: sectionIds } }).then(buildMany);
    };
    SectionRepo.create = function (input) {
        return section_model_1.default.create(input).then(build);
    };
    SectionRepo.deleteById = function (id) {
        return section_model_1.default.findByIdAndDelete(id).then(build);
    };
    SectionRepo.deleteInCampaign = function (campaign) {
        return section_model_1.default.deleteMany({ campaign: campaign });
    };
    SectionRepo.update = function (_a) {
        var _id = _a._id, input = __rest(_a, ["_id"]);
        return section_model_1.default.update({ _id: _id }, __assign({}, input), { upsert: true }).then(build);
    };
    SectionRepo.updateOrCreate = function (input) {
        return input._id ? SectionRepo.update(input) : SectionRepo.create(input);
    };
    return SectionRepo;
}());
exports.SectionRepo = SectionRepo;
