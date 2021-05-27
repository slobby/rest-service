"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const task_controller_1 = __importDefault(require("./task.controller"));
const router = express_1.Router({ mergeParams: true });
router.route('/').get(task_controller_1.default.getAll);
router.route('/').post(task_controller_1.default.create);
router.route('/:taskId').get(task_controller_1.default.getById);
router.route('/:taskId').put(task_controller_1.default.update);
router.route('/:taskId').delete(task_controller_1.default.deletById);
exports.default = router;
