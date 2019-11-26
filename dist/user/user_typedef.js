"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_1 = require("apollo-server");
exports.default = apollo_server_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  input UserInput {\n    email: String!\n    password: String\n  }\n\n  input RefreshInput {\n    token: String!\n  }\n\n  type User {\n    _id: ID\n    email: String!\n    password: String\n    campaigns: [Campaign!]!\n  }\n\n  type AuthData {\n    userId: ID!\n    token: String!\n    tokenExpiration: Int!\n  }\n\n  extend type Query {\n    login(input: UserInput): AuthData\n    refreshToken(input: RefreshInput): AuthData\n  }\n\n  extend type Mutation {\n    createUser(input: UserInput): AuthData!\n  }\n"], ["\n  input UserInput {\n    email: String!\n    password: String\n  }\n\n  input RefreshInput {\n    token: String!\n  }\n\n  type User {\n    _id: ID\n    email: String!\n    password: String\n    campaigns: [Campaign!]!\n  }\n\n  type AuthData {\n    userId: ID!\n    token: String!\n    tokenExpiration: Int!\n  }\n\n  extend type Query {\n    login(input: UserInput): AuthData\n    refreshToken(input: RefreshInput): AuthData\n  }\n\n  extend type Mutation {\n    createUser(input: UserInput): AuthData!\n  }\n"])));
var templateObject_1;
