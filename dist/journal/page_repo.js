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
var page_model_1 = __importDefault(require("./page_model"));
var build = function (page) { return page && page.toObject(); };
var buildMany = function (Pages) { return Pages.map(build); };
var PageRepo = /** @class */ (function () {
    function PageRepo() {
    }
    PageRepo.findBySection = function (section) {
        return page_model_1.default.find({ section: section }).then(buildMany);
    };
    PageRepo.findInSession = function (campaign) {
        return page_model_1.default.find({ inSession: true, campaign: campaign }).then(buildMany);
    };
    PageRepo.findByIds = function (pageIds) {
        return page_model_1.default.find({ _id: { $in: pageIds } }).then(buildMany);
    };
    PageRepo.findById = function (input) {
        return page_model_1.default.findById(input).then(build);
    };
    PageRepo.create = function (input) {
        return page_model_1.default.create(input).then(build);
    };
    PageRepo.deleteById = function (id) {
        return page_model_1.default.findByIdAndDelete(id).then(build);
    };
    PageRepo.deleteInCampaign = function (campaign) {
        return page_model_1.default.deleteMany({ campaign: campaign });
    };
    PageRepo.deleteByIds = function (ids) {
        return page_model_1.default.deleteMany({ id: { $in: ids } });
    };
    PageRepo.update = function (_a) {
        var _id = _a._id, input = __rest(_a, ["_id"]);
        return page_model_1.default.update({ _id: _id }, __assign({}, input), { upsert: true }).then(build);
    };
    // NOTE addToSession * removeFromSession is not returning buildable page,
    // but we don't have to return anything currently so I'm just not building for now.
    PageRepo.addToSession = function (_id) {
        return page_model_1.default.update({ _id: _id }, { inSession: true });
    };
    PageRepo.removeFromSession = function (_id) {
        return page_model_1.default.update({ _id: _id }, { inSession: false });
    };
    PageRepo.updateOrCreate = function (input) {
        return input._id ? PageRepo.update(input) : PageRepo.create(input);
    };
    return PageRepo;
}());
exports.PageRepo = PageRepo;
