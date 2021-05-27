"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const board_controller_1 = __importDefault(require("./board.controller"));
const router = express_1.Router();
router.route('/').get(board_controller_1.default.getAll);
router.route('/').post(board_controller_1.default.create);
router.route('/:boardId').get(board_controller_1.default.getById);
router.route('/:boardId').put(board_controller_1.default.update);
router.route('/:boardId').delete(board_controller_1.default.deletById);
exports.default = router;
