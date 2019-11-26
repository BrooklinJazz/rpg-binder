"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var campaign_model_1 = __importDefault(require("./campaign_model"));
var build = function (campaign) { return campaign.toObject(); };
var buildMany = function (campaigns) {
    return campaigns.map(build);
};
var throwIfEmpty = function (doc) {
    if (!doc) {
        throw new Error("Campaign Document does not exist");
    }
    return doc;
};
var CampaignRepo = /** @class */ (function () {
    function CampaignRepo() {
    }
    CampaignRepo.findByUser = function (userId) {
        return campaign_model_1.default.find({ creator: userId }).then(buildMany);
    };
    CampaignRepo.findById = function (id) {
        return campaign_model_1.default.findById(id)
            .then(throwIfEmpty)
            .then(build);
    };
    CampaignRepo.create = function (input) {
        return campaign_model_1.default.create(input).then(build);
    };
    CampaignRepo.deleteById = function (id) {
        return campaign_model_1.default.findByIdAndDelete(id);
    };
    return CampaignRepo;
}());
exports.default = CampaignRepo;
