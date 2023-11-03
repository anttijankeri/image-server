"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./auth"));
const users_1 = __importDefault(require("./users"));
const objects_1 = __importDefault(require("./objects"));
const router = express_1.default.Router();
router.use(auth_1.default);
router.use(users_1.default);
router.use(objects_1.default);
exports.default = router;
