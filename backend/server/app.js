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
const booking_data_1 = require("./databases/booking.data");
const tag_data_1 = require("./databases/tag.data");
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
app.get("/api/bookings", (_, res) => {
    res.send(booking_data_1.sample_bookings);
});
app.get("/api/bookings/search/:searchLocalization", (req, res) => {
    const searchLocalization = req.params.searchLocalization;
    const bookings = booking_data_1.sample_bookings.filter((booking) => booking.localization
        .toLowerCase()
        .includes(searchLocalization.toLowerCase()));
    res.send(bookings);
});
app.get("/api/bookings/tags", (_, res) => {
    res.send(tag_data_1.sample_bookingsTags);
});
app.get("/api/bookings/tag/:tagName", (req, res) => {
    const tagName = req.params.tagName;
    const bookings = booking_data_1.sample_bookings.filter((booking) => booking.tags?.includes(tagName));
    res.send(bookings);
});
app.get("/api/bookings/:bookingId", (req, res) => {
    const bookingId = req.params.bookingId;
    const booking = booking_data_1.sample_bookings.find((booking) => booking._id == bookingId);
    res.send(booking);
});
app.get("*", (_, res) => {
    res.sendFile(path_1.default.resolve("../frontend/client/index.html"));
});
exports.default = app;
//# sourceMappingURL=app.js.map