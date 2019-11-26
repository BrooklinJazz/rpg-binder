"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var campaignSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    sections: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Organization"
        }
    ],
    creator: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});
var CampaignModel = mongoose_1.model("Campaign", campaignSchema);
exports.default = CampaignModel;
