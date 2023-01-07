# Changelog

## [0.2.0](https://github.com/domicileapp/domicile/compare/api-v0.1.0...api-v0.2.0) (2023-01-07)


### ⚠ BREAKING CHANGES

* major refactor
* remove NX
* **api/tasks:** add completed attribute
* `TypeORM` => `MikroORM`
* trying out new starter template
* authentication changes
* more authentication changes
* authentication fixes

### Features

* `TypeORM` =&gt; `MikroORM` ([5b43abd](https://github.com/domicileapp/domicile/commit/5b43abd15f19861ea80f8782db49df761f5896e7))
* add operator boilerplate ([148e701](https://github.com/domicileapp/domicile/commit/148e7014397cd856ede78adb8d0266bf10097e5a))
* **api/tasks:** add completed attribute ([4780c9e](https://github.com/domicileapp/domicile/commit/4780c9e333c89f56ed9259759de5feac4eb7d326))
* **api:** basic authentication (login) functionality ([6041307](https://github.com/domicileapp/domicile/commit/60413076c07795a104cfb8d35994b4a5e0660ecf))
* **api:** start of task and todos ([931da67](https://github.com/domicileapp/domicile/commit/931da67c101adcfbf1d1f397275082da515b46be))
* authentication changes ([3850ca4](https://github.com/domicileapp/domicile/commit/3850ca4f03d6b067f310d66d31469a97f7f822e9))
* authentication changes p2 ([f22950e](https://github.com/domicileapp/domicile/commit/f22950e934f58642e2d8926070f4216ad2167b58))
* create task mutation ([5bb4d01](https://github.com/domicileapp/domicile/commit/5bb4d017394d72d35eae6e6c9db0a93344cde3eb))
* database seeder (yay) ([0a4e3b5](https://github.com/domicileapp/domicile/commit/0a4e3b57176165a9f7477fc7eda48bd12a7e127a))
* docker and keycloak ([005bf2a](https://github.com/domicileapp/domicile/commit/005bf2a06deab50d9227d7877fefe38f9c58175e))
* export swagger specifications ([aabaa96](https://github.com/domicileapp/domicile/commit/aabaa964430412739432b07b8e6c13ba2640cd29))
* init ([b42d995](https://github.com/domicileapp/domicile/commit/b42d99550b826be366614fae24b3e8c5589db42d))
* more authentication changes ([7b3fad9](https://github.com/domicileapp/domicile/commit/7b3fad9e6638946b4f03367264cfe925573d2dee))
* todo base configuration ([4ac7514](https://github.com/domicileapp/domicile/commit/4ac7514217b4f11f7cf3f2e82aeb7ae15425a0ae))
* trying out new starter template ([2be75ef](https://github.com/domicileapp/domicile/commit/2be75efbeb173585efc1c7e96159918c71069671))


### Documentation

* update swagger documentation ([4b3ce51](https://github.com/domicileapp/domicile/commit/4b3ce51414b2b428f5d393820e4c80ff7edcb887))


### Performance improvements

* **api:** test out redis and websockets ([97f6f20](https://github.com/domicileapp/domicile/commit/97f6f20deaa409b05dfa714d05f4ede958723d43))
* **infra:** migrate to k8s for database ([0f2288a](https://github.com/domicileapp/domicile/commit/0f2288aeae19f4fa51c1a8d738007e8e96fe3472))


### Bug fixes

* **api/auth:** login issues ([336a417](https://github.com/domicileapp/domicile/commit/336a4174e47bd0d1508dc072ad4e79689e994be8))
* **api:** openapi formatting fix ([ba9e4ea](https://github.com/domicileapp/domicile/commit/ba9e4eabd7a52c20b2f507bf179540a454867feb))
* authentication fixes ([8a1e98b](https://github.com/domicileapp/domicile/commit/8a1e98b1b21992d7fba45a13016b2acd702a5b13))
* **deps:** pin dependencies ([ddc6f5c](https://github.com/domicileapp/domicile/commit/ddc6f5c66f59228e050b13e7d878b96c6f3f89e5))
* **deps:** pin dependencies ([094acfa](https://github.com/domicileapp/domicile/commit/094acfa528637487f499cd9981177c75b793f172))
* **openapi:** pretty print swagger-spec ([84b661f](https://github.com/domicileapp/domicile/commit/84b661fa149358766ab1d14b713ea78936f87330))
* yarn lock files out of sync ([f84ee9e](https://github.com/domicileapp/domicile/commit/f84ee9e9f6fbaec358945630c9a6f6cb9e8b90b6))


### Build

* **deps-dev:** bump @nestjs/testing from 9.1.1 to 9.1.2 in /api ([e79eb10](https://github.com/domicileapp/domicile/commit/e79eb1031a78ce63acd3f06d2593e14d3de109f7))
* **deps-dev:** bump @nestjs/testing from 9.1.6 to 9.2.0 in /api ([1746310](https://github.com/domicileapp/domicile/commit/17463107909eb1978737a5d5f5d3eb110601f04b))
* **deps-dev:** bump @types/jest from 29.0.2 to 29.0.3 in /api ([ec3cec7](https://github.com/domicileapp/domicile/commit/ec3cec7981d4a5a649d736125482b828421fc7c3))
* **deps-dev:** bump @types/validator from 13.7.7 to 13.7.8 in /api ([f03e59c](https://github.com/domicileapp/domicile/commit/f03e59c512f1cc98eb9bdc627fec3740b629b5f2))
* **deps-dev:** bump dependencies in /api ([84309a7](https://github.com/domicileapp/domicile/commit/84309a78bfd6fb8c826ab8fc09b9d2c60c466f74))
* **deps:** bump @nestjs/common from 9.1.1 to 9.1.2 in /api ([28c50ef](https://github.com/domicileapp/domicile/commit/28c50ef1eb423a22dd00f8c9c090da95b251ce51))
* **deps:** bump @nestjs/core from 9.1.1 to 9.1.2 in /api ([aac9a3e](https://github.com/domicileapp/domicile/commit/aac9a3ed62166eb678984f21fc1529ec53162294))
* **deps:** bump @nestjs/core from 9.1.6 to 9.2.0 in /api ([8f05193](https://github.com/domicileapp/domicile/commit/8f051933f97035762265c40fd76d6031957cb626))
* **deps:** bump @nestjs/platform-express from 9.1.1 to 9.1.2 in /api ([e3e57a6](https://github.com/domicileapp/domicile/commit/e3e57a6f4fc6a44ec355b713d4d539ff4607fe06))
* **deps:** bump @types/validator to 13.7.9 ([5c15f52](https://github.com/domicileapp/domicile/commit/5c15f52986fad7b483ae9649ecca475d91348ec2))
* **deps:** bump dependencies to latest patches ([1fbfb15](https://github.com/domicileapp/domicile/commit/1fbfb157cf7082cce64edb15d21ed94d50352e23))
* **deps:** bump dependencies to the latest patches ([4c52515](https://github.com/domicileapp/domicile/commit/4c52515ba6003e310ccc5f0c4939757c61bafa3e))
* **deps:** bump joi from 17.6.0 to 17.6.1 in /api ([be38bae](https://github.com/domicileapp/domicile/commit/be38bae3ba344e423da19aafdd05cf4aa0adcb5f))
* **deps:** move to pnpm [skip ci] ([9c159b1](https://github.com/domicileapp/domicile/commit/9c159b1db4daca37788bacb9012be550e313d63e))
* **docker:** docker development containters testing ([ee0b054](https://github.com/domicileapp/domicile/commit/ee0b054070d6d3c9fd7d30e593a708c1c2a6aa4f))
* evaluating release-it ([03b1db5](https://github.com/domicileapp/domicile/commit/03b1db57727b8ad72b94e972e7e2f45d8e701c46))
* update release-please config ([1385863](https://github.com/domicileapp/domicile/commit/13858639abfaeae0c7215b4c8f37b7fd649d8847))


### revert

* remove NX ([0d09d6e](https://github.com/domicileapp/domicile/commit/0d09d6e44decbfefca5a148740ff7b0c13a8ba1f))


### Chores

* add openapi/postman folders ([46e05fc](https://github.com/domicileapp/domicile/commit/46e05fc68364d35a932b0f348d0b914e1a68fad4))
* **api:** move openapi document ([ed62f1c](https://github.com/domicileapp/domicile/commit/ed62f1c00c0fe3572e37167148fe6a6d82ff2d50))
* **api:** move openapi json output ([6d3da2c](https://github.com/domicileapp/domicile/commit/6d3da2c3301d121354345ce535420e3782c311a6))
* **build:** move to yarn 3 ([6a95924](https://github.com/domicileapp/domicile/commit/6a9592485f47655c32c7100efa6de53409f891cb))
* deps ([6b586ed](https://github.com/domicileapp/domicile/commit/6b586edda6cc5e372f2786368d705d34acbf6c36))
* **deps:** add new required deps ([7da214f](https://github.com/domicileapp/domicile/commit/7da214f0c3dab97a422b1b86e871df4c13f2613b))
* **deps:** bump dependencies ([92b43eb](https://github.com/domicileapp/domicile/commit/92b43ebd7da92e99f64a19836970e3324ec76adf))
* **deps:** bump dependencies to latest ([222a6bd](https://github.com/domicileapp/domicile/commit/222a6bd3826501b15bdc7a44f61c53e6450b0834))
* **deps:** bump to latest ([bf06bcb](https://github.com/domicileapp/domicile/commit/bf06bcb70cb4ddcddf5bfdeefe052587ad8e4cd8))
* **deps:** bump to latest patches ([adcec01](https://github.com/domicileapp/domicile/commit/adcec01c53dd1170653c701717895044be128714))
* **deps:** remove release-it ([29b1cc1](https://github.com/domicileapp/domicile/commit/29b1cc1044a78264b56e79f9f3bb6b6b0b45919f))
* **deps:** update dependency @nestjs/cli to v9.1.3 ([084fd38](https://github.com/domicileapp/domicile/commit/084fd38ff91b61db924ea78617b2f1885444fa25))
* **deps:** update dependency eslint to v8.23.1 ([7207845](https://github.com/domicileapp/domicile/commit/7207845d245ca66f375ab3a04778edaf88f865cd))
* **deps:** update dependency ts-jest to v28.0.8 ([adce1c9](https://github.com/domicileapp/domicile/commit/adce1c95ef1bf575e58dcba595d42ec0ec81aabf))
* **deps:** update dependency tsconfig-paths to v4.1.0 ([cb60ee5](https://github.com/domicileapp/domicile/commit/cb60ee5c5f87d9bfa1d5eb8178581e6425087e53))
* **deps:** update jest monorepo ([5ca205b](https://github.com/domicileapp/domicile/commit/5ca205b47e88af5091c1c202077f4aa6d7ea0a89))
* **deps:** update jest monorepo to v29 ([736efc2](https://github.com/domicileapp/domicile/commit/736efc296f1034ae3ffb018b26b9a5aaf2cd7b60))
* **deps:** update nest monorepo to v9 ([15c8bb6](https://github.com/domicileapp/domicile/commit/15c8bb6e8804f67536f7d87509569ba6ad30e618))
* **deps:** update typescript-eslint monorepo to v5.37.0 ([8a9e6cc](https://github.com/domicileapp/domicile/commit/8a9e6ccaae1ff53db122c5950b258cf82fdcd15e))
* general configureation ([21fa4d5](https://github.com/domicileapp/domicile/commit/21fa4d5b7fa9dace9b94dc8b15f364a7f77b41cc))
* postman updates ([b0fe04a](https://github.com/domicileapp/domicile/commit/b0fe04a8bf7ea9560127f8065dce56d6824a15c3))
* **postman:** add test to populate access token ([f451620](https://github.com/domicileapp/domicile/commit/f451620410bc8541bd2a74a6085c644a60e97722))
* **postman:** new collection for testing ([a268176](https://github.com/domicileapp/domicile/commit/a268176a80fb03072542a6cae3290d242aab9599))
* release 0.0.2 ([a7777f9](https://github.com/domicileapp/domicile/commit/a7777f9bb5391fc9714e21aaa50665adbdf2d9d0))
* release 0.1.0 ([12f25ae](https://github.com/domicileapp/domicile/commit/12f25ae879a55bdae1b1eb59f16d16e1cc8b11d7))
* release 0.2.0 ([697fdec](https://github.com/domicileapp/domicile/commit/697fdecfcf61bd9d5cb16c214cfc05a8b02ddb8b))
* release 0.3.0 ([0f955f6](https://github.com/domicileapp/domicile/commit/0f955f6be15b1c4921b296cfb30a3b4fc37e1db4))
* temp file updates ([7e70996](https://github.com/domicileapp/domicile/commit/7e70996796ea8d85599ebee02a1cbe9f547d9828))


### Refactors

* directory structure ([06e9d2b](https://github.com/domicileapp/domicile/commit/06e9d2be27f9d2d9ebc710d528f7d3a4f7cf592f))
* major refactor ([5f7eb2f](https://github.com/domicileapp/domicile/commit/5f7eb2fe373f56831b36dce4c320d36a32930929))
* todo =&gt; task ([42a292a](https://github.com/domicileapp/domicile/commit/42a292af6551a46a5bfed16b152036517a0af79e))
* use typescript ([7155e47](https://github.com/domicileapp/domicile/commit/7155e47260060df8e5286ae871e5a7c59e8aa592))
* whitespace fixes ([948c11a](https://github.com/domicileapp/domicile/commit/948c11a6596bed624a096b7d21a6ef127821dee3))
