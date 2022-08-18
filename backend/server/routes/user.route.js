"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = __importDefault(require("../models/user.model"));
const router = (0, express_1.Router)();
router.post("/", (req, res) => {
    const newUser = new user_model_1.default({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: bcrypt_1.default.hashSync(req.body.password, bcrypt_1.default.genSaltSync(8)),
    });
    newUser.save((err) => {
        if (err) {
            res.status(400).json("Inscription échoué.");
        }
        else {
            res.json("Inscription validé.");
        }
    });
});
exports.default = router;
//# sourceMappingURL=user.route.js.map