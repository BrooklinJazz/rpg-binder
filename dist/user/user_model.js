"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    description: String,
    sections: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Section"
        }
    ],
    campaigns: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Campaign"
        }
    ]
});
var UserModel = mongoose_1.model("User", userSchema);
exports.default = UserModel;
