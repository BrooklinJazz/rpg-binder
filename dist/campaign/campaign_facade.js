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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var campaign_repo_1 = __importDefault(require("./campaign_repo"));
var campaign_object_1 = __importDefault(require("./campaign_object"));
var CampaignFacade = /** @class */ (function () {
    function CampaignFacade(user) {
        var _this = this;
        // this is probably an antipattern using the repo rather than the BO.
        this.getCampaigns = function () { return campaign_repo_1.default.findByUser(_this.user); };
        this.getCampaign = function (id) { return campaign_repo_1.default.findById(id); };
        this.create = function (input) {
            return new campaign_object_1.default(__assign({}, input, { creator: _this.user })).createAndSave();
        };
        this.delete = function (id) {
            return campaign_repo_1.default.findById(id)
                .then(function (campaign) { return campaign_object_1.default.fromCampaign(campaign); })
                .then(function (campaignObj) { return campaignObj.delete(id); });
        };
        this.user = user;
    }
    return CampaignFacade;
}());
exports.default = CampaignFacade;
