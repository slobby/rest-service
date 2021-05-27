"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_errors_1 = __importDefault(require("http-errors"));
const fs_1 = __importDefault(require("fs"));
const morgan_1 = __importDefault(require("morgan"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const path_1 = __importDefault(require("path"));
const yamljs_1 = __importDefault(require("yamljs"));
const user_router_1 = __importDefault(require("./resources/users/user.router"));
const board_router_1 = __importDefault(require("./resources/boards/board.router"));
const task_router_1 = __importDefault(require("./resources/tasks/task.router"));
const app = express_1.default();
const swaggerDocument = yamljs_1.default.load(path_1.default.join(__dirname, '../doc/api.yaml'));
if (app.get('env') === 'production') {
    const accessLogStream = fs_1.default.createWriteStream(path_1.default.join(__dirname, '../log/', 'access.log'), { flags: 'a' });
    app.use(morgan_1.default('combined', { stream: accessLogStream }));
}
else {
    app.use(morgan_1.default('dev'));
}
app.use(express_1.default.json());
app.use('/doc', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
app.use('/', (req, res, next) => {
    if (req.originalUrl === '/') {
        res.send('Service is running!');
        return;
    }
    next();
});
app.use('/users', user_router_1.default);
app.use('/boards', board_router_1.default);
app.use('/boards/:boardId/tasks', task_router_1.default);
app.use((_req, _res, next) => {
    next(http_errors_1.default(404, 'Not found'));
});
app.use((err, _req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message || 'Internal Server Error',
        },
    });
    if (!err) {
        next(err);
    }
});
exports.default = app;
