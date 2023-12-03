"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const utils_1 = require("../utils");
const userSchema = new mongoose_1.default.Schema({
    fullName: {
        type: String,
        required: [true, 'Please insert you name'],
        trim: true,
        maxLength: [20, 'Name is limit by 20 charater'],
    },
    email: {
        type: String,
        required: [true, 'Please insert you email'],
        trim: true,
        unique: true,
        validate: [utils_1.validateEmail, 'Email format invalid'],
    },
    password: {
        type: String,
        required: [true, 'Please insert password'],
        MaxLength: [20, 'Pass length require 6 to 20 char'],
    },
    role: {
        type: String,
        default: 'user',
    },
    rf_token: { type: String, select: false },
}, { timestamps: true });
exports.default = mongoose_1.default.model('Users', userSchema);
