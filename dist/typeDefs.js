"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_1 = require("apollo-server");
var campaign_typedef_1 = __importDefault(require("./campaign/campaign_typedef"));
var journal_typedef_1 = __importDefault(require("./journal/journal_typedef"));
var user_typedef_1 = __importDefault(require("./user/user_typedef"));
var session_typedef_1 = __importDefault(require("./session/session_typedef"));
var root = apollo_server_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\ninput SingleID {\n  _id: ID!\n}\n\n  type Query {\n    _: String\n  }\n\n  type Mutation {\n    _: String\n  }\n"], ["\ninput SingleID {\n  _id: ID!\n}\n\n  type Query {\n    _: String\n  }\n\n  type Mutation {\n    _: String\n  }\n"])));
exports.default = [root, user_typedef_1.default, campaign_typedef_1.default, journal_typedef_1.default, session_typedef_1.default];
var templateObject_1;
