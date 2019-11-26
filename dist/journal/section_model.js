"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var sectionSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    pages: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Page"
        }
    ],
    creator: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User"
    },
    campaign: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Campaign",
        required: true
    }
});
var SectionModel = mongoose_1.model("Section", sectionSchema);
exports.default = SectionModel;
