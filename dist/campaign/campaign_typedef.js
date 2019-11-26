"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_1 = require("apollo-server");
exports.default = apollo_server_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type Campaign {\n    _id: ID!\n    name: String!\n    # sections: [Section!]!\n    creator: User!\n  }\n\n  input CampaignInput {\n    name: String!\n  }\n\n  input UpdateCampaignInput {\n    _id: ID!\n    name: String!\n  }\n\n\n  extend type Query {\n    campaigns: [Campaign!]!\n    campaign(input: SingleID): Campaign!\n  }\n\n  extend type Mutation {\n    createCampaign(input: CampaignInput): Campaign!\n    updateCampaign(input: UpdateCampaignInput): Campaign!\n    deleteCampaign(input: SingleID): Boolean\n  }\n"], ["\n  type Campaign {\n    _id: ID!\n    name: String!\n    # sections: [Section!]!\n    creator: User!\n  }\n\n  input CampaignInput {\n    name: String!\n  }\n\n  input UpdateCampaignInput {\n    _id: ID!\n    name: String!\n  }\n\n\n  extend type Query {\n    campaigns: [Campaign!]!\n    campaign(input: SingleID): Campaign!\n  }\n\n  extend type Mutation {\n    createCampaign(input: CampaignInput): Campaign!\n    updateCampaign(input: UpdateCampaignInput): Campaign!\n    deleteCampaign(input: SingleID): Boolean\n  }\n"])));
var templateObject_1;
