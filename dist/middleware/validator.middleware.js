"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
// @desc Finds the validation errors in this request and wraps them in an object with handy functions
const validatorMiddleware = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        //    res.status(400).json({ status:"fail",message:errors[0].msg });
        const errorsArray = errors.array();
        res.status(400).json({ status: "fail", message: errorsArray[0].msg });
        return;
    }
    next();
};
exports.default = validatorMiddleware;
