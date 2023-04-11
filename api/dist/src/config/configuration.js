"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    auth: {
        jwtKey: process.env.JWT_KEY,
    },
});
//# sourceMappingURL=configuration.js.map