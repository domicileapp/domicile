# Changelog

## [0.2.0](https://github.com/patrickblackjr/domicile/compare/domicile-v0.1.0...domicile-v0.2.0) (2022-09-26)


### ⚠ BREAKING CHANGES

* `TypeORM` => `MikroORM`
* trying out new starter template
* authentication changes

### Features

* `TypeORM` => `MikroORM` ([5b43abd](https://github.com/patrickblackjr/domicile/commit/5b43abd15f19861ea80f8782db49df761f5896e7))
* **api:** start of task and todos ([931da67](https://github.com/patrickblackjr/domicile/commit/931da67c101adcfbf1d1f397275082da515b46be))
* authentication changes ([3850ca4](https://github.com/patrickblackjr/domicile/commit/3850ca4f03d6b067f310d66d31469a97f7f822e9))
* authentication changes p2 ([f22950e](https://github.com/patrickblackjr/domicile/commit/f22950e934f58642e2d8926070f4216ad2167b58))
* trying out new starter template ([2be75ef](https://github.com/patrickblackjr/domicile/commit/2be75efbeb173585efc1c7e96159918c71069671))


### Bug fixes

* **deps:** pin dependency postcss to 8.4.16 ([1369f83](https://github.com/patrickblackjr/domicile/commit/1369f83a702b0f5661054992b77b72e2f473ba08))
* yarn lock files out of sync ([f84ee9e](https://github.com/patrickblackjr/domicile/commit/f84ee9e9f6fbaec358945630c9a6f6cb9e8b90b6))


### Performance improvements

* **infra:** migrate to k8s for database ([0f2288a](https://github.com/patrickblackjr/domicile/commit/0f2288aeae19f4fa51c1a8d738007e8e96fe3472))


### Chores

* **build:** move to yarn 3 ([6a95924](https://github.com/patrickblackjr/domicile/commit/6a9592485f47655c32c7100efa6de53409f891cb))
* **deps:** remove release-it ([29b1cc1](https://github.com/patrickblackjr/domicile/commit/29b1cc1044a78264b56e79f9f3bb6b6b0b45919f))
* **deps:** update dependency @nestjs/cli to v9.1.3 ([084fd38](https://github.com/patrickblackjr/domicile/commit/084fd38ff91b61db924ea78617b2f1885444fa25))
* **deps:** update dependency autoprefixer to v10.4.10 ([7c8a55a](https://github.com/patrickblackjr/domicile/commit/7c8a55ae0fe61b09df90e4e127c3e09a25ec2d35))
* **deps:** update dependency autoprefixer to v10.4.9 ([b032975](https://github.com/patrickblackjr/domicile/commit/b032975b819d8b1982854f962c01c5ae7e4ca009))
* **deps:** update dependency eslint to v8.23.1 ([7207845](https://github.com/patrickblackjr/domicile/commit/7207845d245ca66f375ab3a04778edaf88f865cd))
* **deps:** update typescript-eslint monorepo to v5.37.0 ([8a9e6cc](https://github.com/patrickblackjr/domicile/commit/8a9e6ccaae1ff53db122c5950b258cf82fdcd15e))
* **gh-actions:** update labeler settings ([e7d4fdb](https://github.com/patrickblackjr/domicile/commit/e7d4fdbca9724a82e783e931f232170cd873078d))
* update README ([ac5331c](https://github.com/patrickblackjr/domicile/commit/ac5331cf8829ef59f452722fa9c73090655e38a7))
* update release-please config to include performance improvements ([4dc322c](https://github.com/patrickblackjr/domicile/commit/4dc322c4c18c1c8e3347de8bc8112ef98324c309))
* vscode settings updates ([cef13de](https://github.com/patrickblackjr/domicile/commit/cef13de7d0ab5c24e60ff88b8cec1d2b48b98bce))


### Refactors

* `.yml` => `.yaml` ([068e327](https://github.com/patrickblackjr/domicile/commit/068e327c0e3f3e89fc451d03c88a210752586972))


### Build & tests

* add labeler ([b63abfe](https://github.com/patrickblackjr/domicile/commit/b63abfed8e332ac75f5ba89d1b1f58de63f0bf57))
* build images on each push to dev ([f2bad9f](https://github.com/patrickblackjr/domicile/commit/f2bad9f3da9b1c27534042619f77f9df4e2dc06a))
* create labeler config ([5bcb5ca](https://github.com/patrickblackjr/domicile/commit/5bcb5caf72a013bd4464706e1e748e15e4464237))
* **deps-dev:** bump @nestjs/testing from 9.1.1 to 9.1.2 in /api ([e79eb10](https://github.com/patrickblackjr/domicile/commit/e79eb1031a78ce63acd3f06d2593e14d3de109f7))
* **deps-dev:** bump @quasar/app-vite from 1.1.1 to 1.1.2 in /app ([28aa58a](https://github.com/patrickblackjr/domicile/commit/28aa58ab876c765dc6242ccaa89dec145f61f4fe))
* **deps-dev:** bump @types/jest from 29.0.2 to 29.0.3 in /api ([ec3cec7](https://github.com/patrickblackjr/domicile/commit/ec3cec7981d4a5a649d736125482b828421fc7c3))
* **deps-dev:** bump @types/node from 16.11.58 to 18.7.18 in /app ([456698a](https://github.com/patrickblackjr/domicile/commit/456698a30f471b9f8226d16e58e8b9f055f0f1d7))
* **deps-dev:** bump @typescript-eslint/eslint-plugin in /app ([f20c274](https://github.com/patrickblackjr/domicile/commit/f20c2746798c15a244a7ff1d08a28cadae9ce221))
* **deps-dev:** bump @typescript-eslint/parser in /app ([2439c5c](https://github.com/patrickblackjr/domicile/commit/2439c5c104f73c6e34133eb7a643b0de0e22a32f))
* **deps-dev:** bump autoprefixer from 10.4.11 to 10.4.12 in /app ([42abe83](https://github.com/patrickblackjr/domicile/commit/42abe83b92bea51d51b54de002e22c8ee761985d))
* **deps-dev:** bump dependencies in /api ([84309a7](https://github.com/patrickblackjr/domicile/commit/84309a78bfd6fb8c826ab8fc09b9d2c60c466f74))
* **deps-dev:** bump eslint-plugin-vue from 9.4.0 to 9.5.0 in /app ([34c4dea](https://github.com/patrickblackjr/domicile/commit/34c4dea7c6c41885fb6178c40e4bdcf916c96699))
* **deps-dev:** bump release-please from 14.5.0 to 14.6.0 ([b4434e6](https://github.com/patrickblackjr/domicile/commit/b4434e61946f85d70d14f4e2b05bf8bb106d4eaf))
* **deps-dev:** bump release-please from 14.6.0 to 14.7.1 ([2867388](https://github.com/patrickblackjr/domicile/commit/2867388556d191376e20a6de6c20ea700ccdb6d8))
* **deps-dev:** bump to latest patches in /app ([0d73034](https://github.com/patrickblackjr/domicile/commit/0d730347ac0963ac4e35bcc794db137f5b42eece))
* **deps:** bump @nestjs/common from 9.1.1 to 9.1.2 in /api ([28c50ef](https://github.com/patrickblackjr/domicile/commit/28c50ef1eb423a22dd00f8c9c090da95b251ce51))
* **deps:** bump @nestjs/core from 9.1.1 to 9.1.2 in /api ([aac9a3e](https://github.com/patrickblackjr/domicile/commit/aac9a3ed62166eb678984f21fc1529ec53162294))
* **deps:** bump @nestjs/platform-express from 9.1.1 to 9.1.2 in /api ([e3e57a6](https://github.com/patrickblackjr/domicile/commit/e3e57a6f4fc6a44ec355b713d4d539ff4607fe06))
* **deps:** bump joi from 17.6.0 to 17.6.1 in /api ([be38bae](https://github.com/patrickblackjr/domicile/commit/be38bae3ba344e423da19aafdd05cf4aa0adcb5f))
* **deps:** bump quasar from 2.8.3 to 2.8.4 in /app ([18abe29](https://github.com/patrickblackjr/domicile/commit/18abe2950a50af649465734f09aeb68943da3ec3))
* **deps:** move to pnpm [skip ci] ([9c159b1](https://github.com/patrickblackjr/domicile/commit/9c159b1db4daca37788bacb9012be550e313d63e))
* **docker:** docker development containters testing ([ee0b054](https://github.com/patrickblackjr/domicile/commit/ee0b054070d6d3c9fd7d30e593a708c1c2a6aa4f))
* **docker:** fix naming and tagging ([8e5e53e](https://github.com/patrickblackjr/domicile/commit/8e5e53ee292b33ffa5e2b1cbf5330d20f0a033cc))
* evaluating release-it ([03b1db5](https://github.com/patrickblackjr/domicile/commit/03b1db57727b8ad72b94e972e7e2f45d8e701c46))
* **fix:** update to correct pr header ([c7c2297](https://github.com/patrickblackjr/domicile/commit/c7c2297e5d9d47b6ed81a98f446c888b6b393ecf))
* **infra:** add app and api deployments ([e0273c9](https://github.com/patrickblackjr/domicile/commit/e0273c939ac2aa24177697a340768281ae7801e9))
* rename workspace ([b07e419](https://github.com/patrickblackjr/domicile/commit/b07e4197a52a45099c2498a7e6d14b991468d043))
* **repo:** add sync-labels option ([a521475](https://github.com/patrickblackjr/domicile/commit/a52147512292f24aadf7cbb73d47bf922124be26))
* update workflows ([ca8dff7](https://github.com/patrickblackjr/domicile/commit/ca8dff7612a5e6e8e63d52a0135fbbe862eef026))

## [0.1.0](https://github.com/patrickblackjr/domicile/compare/domicile-v0.0.2...domicile-v0.1.0) (2022-09-11)


### ⚠ BREAKING CHANGES

* more authentication changes
* authentication fixes

### Features

* **api:** basic authentication (login) functionality ([6041307](https://github.com/patrickblackjr/domicile/commit/60413076c07795a104cfb8d35994b4a5e0660ecf))
* **app:** enable SSL for dev ([8763f3d](https://github.com/patrickblackjr/domicile/commit/8763f3d4bf0d2fd921777d8fca4fd6a271b57bf9))
* more authentication changes ([7b3fad9](https://github.com/patrickblackjr/domicile/commit/7b3fad9e6638946b4f03367264cfe925573d2dee))


### Build

* temporarily disable docker ([70be3ed](https://github.com/patrickblackjr/domicile/commit/70be3ed397f0d4a3b203d969e6902460c08f24bc))


### Fixes

* authentication fixes ([8a1e98b](https://github.com/patrickblackjr/domicile/commit/8a1e98b1b21992d7fba45a13016b2acd702a5b13))
* **deps:** pin dependencies ([ddc6f5c](https://github.com/patrickblackjr/domicile/commit/ddc6f5c66f59228e050b13e7d878b96c6f3f89e5))
* **deps:** pin dependencies ([094acfa](https://github.com/patrickblackjr/domicile/commit/094acfa528637487f499cd9981177c75b793f172))


### Chores

* add vscode workspace ([b047c6a](https://github.com/patrickblackjr/domicile/commit/b047c6a8714189b784141cc6770faba90c41a497))
* **deps:** add new required deps ([7da214f](https://github.com/patrickblackjr/domicile/commit/7da214f0c3dab97a422b1b86e871df4c13f2613b))
* **deps:** add renovate.json ([4608697](https://github.com/patrickblackjr/domicile/commit/46086977c0b871d088701bca41ba279f0484fb75))
* **deps:** update dependency @types/node to v16 ([7e628d6](https://github.com/patrickblackjr/domicile/commit/7e628d6235121011cdcbf81d8406222dbe5a4e11))
* **deps:** update dependency ts-jest to v28.0.8 ([adce1c9](https://github.com/patrickblackjr/domicile/commit/adce1c95ef1bf575e58dcba595d42ec0ec81aabf))
* **deps:** update dependency tsconfig-paths to v4.1.0 ([cb60ee5](https://github.com/patrickblackjr/domicile/commit/cb60ee5c5f87d9bfa1d5eb8178581e6425087e53))
* **deps:** update jest monorepo ([5ca205b](https://github.com/patrickblackjr/domicile/commit/5ca205b47e88af5091c1c202077f4aa6d7ea0a89))
* **deps:** update jest monorepo to v29 ([736efc2](https://github.com/patrickblackjr/domicile/commit/736efc296f1034ae3ffb018b26b9a5aaf2cd7b60))
* **deps:** update nest monorepo to v9 ([15c8bb6](https://github.com/patrickblackjr/domicile/commit/15c8bb6e8804f67536f7d87509569ba6ad30e618))
* general configureation ([21fa4d5](https://github.com/patrickblackjr/domicile/commit/21fa4d5b7fa9dace9b94dc8b15f364a7f77b41cc))
* **ide:** update extensions ([a3cafd3](https://github.com/patrickblackjr/domicile/commit/a3cafd389c1fc84f2836ac2fc7573c1aa1755887))
* temporarily disable auth in docker ([e9ecd53](https://github.com/patrickblackjr/domicile/commit/e9ecd533ed766f0c60528d20f3cef5ce22686dc6))

## [0.0.2](https://github.com/patrickblackjr/domicile/compare/domicile-v0.0.1...domicile-v0.0.2) (2022-09-09)


### Features

* `release-please` GitHub action setup ([2f0686a](https://github.com/patrickblackjr/domicile/commit/2f0686aa7c24347a0ccfc49e334c3dd38fcb76d1))
* create task mutation ([5bb4d01](https://github.com/patrickblackjr/domicile/commit/5bb4d017394d72d35eae6e6c9db0a93344cde3eb))
* docker and keycloak ([005bf2a](https://github.com/patrickblackjr/domicile/commit/005bf2a06deab50d9227d7877fefe38f9c58175e))
* init ([b42d995](https://github.com/patrickblackjr/domicile/commit/b42d99550b826be366614fae24b3e8c5589db42d))
* init Quasar UI app ([988601d](https://github.com/patrickblackjr/domicile/commit/988601d734aa6a83ad5bac8e18888949e83f0ad6))


### Chores

* update dependabot settings ([12502a8](https://github.com/patrickblackjr/domicile/commit/12502a8072a92f84ee9c3323b78ee88f2ecf7416))


### Fixes

* change to monorelease type ([3c7873a](https://github.com/patrickblackjr/domicile/commit/3c7873a1024897254b4ca972f84e0e781c6e1161))
* eslint gh actions ([dcb0ebb](https://github.com/patrickblackjr/domicile/commit/dcb0ebb72d234be53f8515bbd1fe184ae22d2772))
* release-please manifest ([079da2c](https://github.com/patrickblackjr/domicile/commit/079da2c0a3af36671e3e7395510d1b64a9901f8d))


### Build

* add additional scopes to `release-please` ([9e15d42](https://github.com/patrickblackjr/domicile/commit/9e15d42410880a642a77cf630f29965e5fe7c64b))
* **eslint:** specify directories ([160178e](https://github.com/patrickblackjr/domicile/commit/160178e7aad02abb5024f98c21062ad788156b12))
* **eslint:** temporarily disable eslint ([c2a56bc](https://github.com/patrickblackjr/domicile/commit/c2a56bc12d8bbd7bc33862ec1b229ebf0b7039ad))
* update PR title ([b27af3c](https://github.com/patrickblackjr/domicile/commit/b27af3cb382fa4aeb91d900afeb3ea7e07b4fb55))
* update versions ([241b035](https://github.com/patrickblackjr/domicile/commit/241b03574016de9f320a6007d478a7ada870787b))
