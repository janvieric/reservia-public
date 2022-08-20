"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const mongoose_1 = __importDefault(require("mongoose"));
const index_route_1 = __importDefault(require("./routes/index.route"));
require("dotenv").config({ path: "./.env" });
const app = (0, express_1.default)();
app.use((0, morgan_1.default)("dev"));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static(path_1.default.resolve("../frontend/client")));
mongoose_1.default.connect(process.env.DATABASE_URL, function (error) {
    if (error) {
        console.log(error);
    }
    else {
        console.log("Connexion à la base de données établie.");
    }
});
app.use(index_route_1.default);
app.get("*", (_, res) => {
    res.sendFile(path_1.default.resolve("../frontend/client/index.html"));
});
exports.default = app;
//# sourceMappingURL=app.js.map