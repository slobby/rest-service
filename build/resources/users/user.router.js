"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("./user.controller"));
const router = express_1.Router();
router.route('/').get(user_controller_1.default.getAll);
router.route('/').post(user_controller_1.default.create);
router.route('/:userId').get(user_controller_1.default.getById);
router.route('/:userId').put(user_controller_1.default.update);
router.route('/:userId').delete(user_controller_1.default.deletById);
exports.default = router;
