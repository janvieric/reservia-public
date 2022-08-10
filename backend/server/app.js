"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv").config({ path: "./.env" });
const index_1 = __importDefault(require("./routes/index"));
const users_1 = __importDefault(require("./routes/users"));
const app = (0, express_1.default)();
app.use((0, morgan_1.default)("dev"));
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static(path_1.default.resolve("../frontend/client")));
mongoose_1.default.connect(process.env.DATABASE, function (error) {
    if (error) {
        console.log(error);
    }
    else {
        console.log("Connexion opened to mongodb!");
    }
});
app.use("/", index_1.default);
app.use("/users", users_1.default);
app.use((next) => {
    next((0, http_errors_1.default)(404));
});
app.use((err, req, res) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    res.status(err.status || 500);
    res.render("error");
});
app.get("*", (_, res) => {
    res.sendFile(path_1.default.resolve("../frontend/client/index.html"));
});
exports.default = app;
//# sourceMappingURL=app.js.map