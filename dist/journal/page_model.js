"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var pageSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    relatedPages: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Page"
        }
    ],
    section: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Section"
    },
    creator: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User"
    },
    campaign: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Campaign",
        required: true
    },
    inSession: {
        type: mongoose_1.Schema.Types.Boolean,
        default: false
    }
});
var PageModel = mongoose_1.model("Page", pageSchema);
exports.default = PageModel;
