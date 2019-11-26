"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var user_model_1 = __importDefault(require("./user_model"));
var build = function (user) { return user && user.toObject(); };
var UserRepo = /** @class */ (function () {
    function UserRepo() {
    }
    UserRepo.findByEmail = function (email) {
        return user_model_1.default.findOne({ email: email }).then(build);
    };
    UserRepo.findById = function (id) { return user_model_1.default.findById(id).then(build); };
    UserRepo.create = function (input) {
        return user_model_1.default.create(input).then(build);
    };
    return UserRepo;
}());
exports.UserRepo = UserRepo;
