"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_1 = require("apollo-server");
exports.default = apollo_server_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type SessionItem {\n    pages: [Page!]!\n    section: Section!\n  }\n\n  type SessionItems {\n    items: [SessionItem!]!\n  }\n\n  input SessionInput {\n    campaign: ID!\n  }\n\n  extend type Query {\n    session(input: SessionInput): [SessionItem!]!\n  }\n\n  input SessionItemInput {\n    page: ID!\n  }\n\n  extend type Mutation {\n    addSessionItem(input: SessionItemInput): ID\n    removeSessionItem(input: SessionItemInput): ID\n  }\n"], ["\n  type SessionItem {\n    pages: [Page!]!\n    section: Section!\n  }\n\n  type SessionItems {\n    items: [SessionItem!]!\n  }\n\n  input SessionInput {\n    campaign: ID!\n  }\n\n  extend type Query {\n    session(input: SessionInput): [SessionItem!]!\n  }\n\n  input SessionItemInput {\n    page: ID!\n  }\n\n  extend type Mutation {\n    addSessionItem(input: SessionItemInput): ID\n    removeSessionItem(input: SessionItemInput): ID\n  }\n"])));
var templateObject_1;
