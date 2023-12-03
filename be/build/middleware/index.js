"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleUserLogin = exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const models_1 = require("../models");
const bcrypt_1 = __importDefault(require("bcrypt"));
const main_1 = require("../config/main");
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.header('Authorization');
        if (!token)
            return res.status(400).send({ msg: 'Invalid' });
        const decoded = jsonwebtoken_1.default.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`);
        if (!decoded)
            return res.status(400).send({ msg: 'Invalid' });
        const user = yield models_1.User.findOne({ _id: decoded.id }).select('-password');
        if (!user)
            return res.status(400).json({ msg: 'User does not exist.' });
        req.user = user;
        next();
    }
    catch (error) {
        return res.status(500).send({ msg: error.message });
    }
});
exports.authenticate = authenticate;
const handleUserLogin = (user, password, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isMatch = yield bcrypt_1.default.compare(password, user.password);
    if (!isMatch) {
        let msgError = 'Wrong password';
        return res.status(400).json({ msg: msgError });
    }
    const access_token = (0, main_1.generateAccessToken)({ id: user._id });
    const refresh_token = (0, main_1.generateRefreshToken)({ id: user._id }, res);
    yield models_1.User.findOneAndUpdate({ _id: user._id }, {
        rf_token: refresh_token,
    });
    res.cookie('refreshtoken', refresh_token, {
        httpOnly: true,
        path: `/api/rf-token`,
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
    });
    res.json({
        msg: 'Login Success!',
        status: 200,
        access_token,
        user: Object.assign(Object.assign({}, user._doc), { password: '' }),
    });
});
exports.handleUserLogin = handleUserLogin;
