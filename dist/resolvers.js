"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var campaign_resolver_1 = __importDefault(require("./campaign/campaign_resolver"));
var journal_resolver_1 = __importDefault(require("./journal/journal_resolver"));
var user_resolver_1 = __importDefault(require("./user/user_resolver"));
var session_resolver_1 = __importDefault(require("./session/session_resolver"));
exports.default = [user_resolver_1.default, campaign_resolver_1.default, journal_resolver_1.default, session_resolver_1.default];
