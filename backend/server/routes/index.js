"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/", (_, res) => {
    res.render("index", { title: "Express" });
});
exports.default = router;
//# sourceMappingURL=index.js.map