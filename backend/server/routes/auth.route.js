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
const RSA_PUB = fs_1.default.readFileSync("./rsa/key.pub");
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
router.delete("/logout", (_, res) => {
    res.clearCookie("token");
    res.end();
});
router.get("/currentuser", async (req, res) => {
    const token = req.cookies.token;
    if (token) {
        try {
            const decodedToken = jsonwebtoken_1.default.verify(token, RSA_PUB);
            if (decodedToken) {
                const user = await user_model_1.default.findById(decodedToken.sub)
                    .select("-password -__v")
                    .exec();
                if (user) {
                    res.json(user);
                }
                else {
                    res.json(null);
                }
            }
            else {
                res.json(null);
            }
        }
        catch (e) {
            res.json(null);
        }
    }
    else {
        res.json(null);
    }
});
exports.default = router;
//# sourceMappingURL=auth.route.js.map