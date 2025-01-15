"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = __importDefault(require("./auth.route"));
const route = (0, express_1.Router)();
route.use("/auth", auth_route_1.default);
route.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found.",
    });
});
exports.default = route;
