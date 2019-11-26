"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.toObject = function (found) {
    if (!found) {
        throw new Error("ApplicationException: Model not found");
    }
    if (Array.isArray(found)) {
        return found.map(function (document) { return document.toObject; });
    }
    return found.toObject();
};
exports.checkSignedIn = function (context) {
    if (!context.user) {
        throw new Error("User is not authenticated");
    }
};
exports.authTokenFromUser = function (user) {
    return jsonwebtoken_1.default.sign({ userId: user._id, email: user.email }, 
    // NOTE using an empty string when undefined to avoid a type issue.
    process.env.JWT_SECRET_KEY || "", { expiresIn: "1hr" });
};
