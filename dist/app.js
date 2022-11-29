"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketController = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const http_1 = __importDefault(require("http"));
const routes_1 = __importDefault(require("./routers/routes"));
const data_source_1 = require("./config/data-source");
const SocketController_1 = require("./controllers/SocketController");
exports.socketController = new SocketController_1.SocketController();
data_source_1.AppDataSource.initialize().then(() => {
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)({ origin: '*' }));
    app.use(express_1.default.json({ limit: '500mb' }));
    app.use(express_1.default.urlencoded({ extended: true, limit: '500mb' }));
    app.use((0, morgan_1.default)('dev'));
    app.use(routes_1.default);
    const server = http_1.default.createServer(app);
    exports.socketController.initialize(server);
    server.listen(process.env.PORT || 3333, () => console.log(`Server started on port ${process.env.PORT || 3333}`));
});