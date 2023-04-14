import { compilerOptions } from './tsconfig.json'
import { pathsToModuleNameMapper, JestConfigWithTsJest } from 'ts-jest'
const jestConfig: JestConfigWithTsJest = {
  displayName: '@domicile/api',
  preset: 'ts-jest',
  moduleDirectories: ['node_modules', '<rootDir>'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
}

export default jestConfig
