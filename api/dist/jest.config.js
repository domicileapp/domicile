"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tsconfig_json_1 = require("./tsconfig.json");
const ts_jest_1 = require("ts-jest");
const jestConfig = {
    displayName: '@domicile/api',
    preset: 'ts-jest',
    moduleDirectories: ['node_modules', '<rootDir>'],
    moduleNameMapper: (0, ts_jest_1.pathsToModuleNameMapper)(tsconfig_json_1.compilerOptions.paths),
};
exports.default = jestConfig;
//# sourceMappingURL=jest.config.js.map