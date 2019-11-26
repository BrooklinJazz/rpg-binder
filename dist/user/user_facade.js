"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var user_object_1 = __importDefault(require("./user_object"));
var UserFacade = /** @class */ (function () {
    function UserFacade() {
        this.signUp = function (input) {
            return new user_object_1.default(input).createAndSave();
        };
        this.login = function (input) {
            return new user_object_1.default(input).getAuthCredentials();
        };
        this.refreshToken = function (input) {
            return user_object_1.default.refreshToken(input.token);
        };
    }
    return UserFacade;
}());
exports.default = UserFacade;
