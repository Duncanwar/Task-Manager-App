"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchErrors = void 0;
const catchErrors = (fn) => (req, res, next) => {
    fn(req, res, next).catch(next);
};
exports.catchErrors = catchErrors;
