"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Visitor_controller_instance_1 = __importDefault(require("../controllers/Visitor.controller.instance"));
const router = (0, express_1.Router)();
router.post('/', Visitor_controller_instance_1.default.create);
router.get('/', Visitor_controller_instance_1.default.findAll);
router.get('/:id', Visitor_controller_instance_1.default.findById);
router.patch('/:id/exit', Visitor_controller_instance_1.default.exit);
exports.default = router;
//# sourceMappingURL=Visitor.routes.js.map