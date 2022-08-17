"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const fs_1 = __importDefault(require("fs"));
const user_model_1 = __importDefault(require("../models/user.model"));
const router = (0, express_1.Router)();
const RSA_PRIVATE = fs_1.default.readFileSync("./rsa/key");
router.post("/connexion", async (req, res) => {
    try {
        const user = await user_model_1.default.findOne({ email: req.body.email }).exec();
        if (user && bcrypt_1.default.compareSync(req.body.password, user.password)) {
            const token = jsonwebtoken_1.default.sign({}, RSA_PRIVATE, {
                subject: user._id.toString(),
                algorithm: "RS256",
                expiresIn: 60 * 60 * 24 * 30 * 6,
            });
            res.cookie("token", token, { httpOnly: true });
            return res.json(user);
        }
        else {
            return res.status(401).json("Email et/ou mot de passe incorrect(s).");
        }
    }
    catch (e) {
        return res.status(401).json("Email et/ou mot de passe incorrect(s).");
    }
});
exports.default = router;
//# sourceMappingURL=auth.route.js.map