'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">domicile-api documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="changelog.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>CHANGELOG
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AuthModule-46a2c1b3a61f544b8d74f6bd1b4a4549476e2dbbd5b878ec3b3c0ddefcae15b04db03303aad8a31ef17e4e0681b02e864a57e4db4cbbb56cc6b15cf3742b0452"' : 'data-target="#xs-controllers-links-module-AuthModule-46a2c1b3a61f544b8d74f6bd1b4a4549476e2dbbd5b878ec3b3c0ddefcae15b04db03303aad8a31ef17e4e0681b02e864a57e4db4cbbb56cc6b15cf3742b0452"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-46a2c1b3a61f544b8d74f6bd1b4a4549476e2dbbd5b878ec3b3c0ddefcae15b04db03303aad8a31ef17e4e0681b02e864a57e4db4cbbb56cc6b15cf3742b0452"' :
                                            'id="xs-controllers-links-module-AuthModule-46a2c1b3a61f544b8d74f6bd1b4a4549476e2dbbd5b878ec3b3c0ddefcae15b04db03303aad8a31ef17e4e0681b02e864a57e4db4cbbb56cc6b15cf3742b0452"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthModule-46a2c1b3a61f544b8d74f6bd1b4a4549476e2dbbd5b878ec3b3c0ddefcae15b04db03303aad8a31ef17e4e0681b02e864a57e4db4cbbb56cc6b15cf3742b0452"' : 'data-target="#xs-injectables-links-module-AuthModule-46a2c1b3a61f544b8d74f6bd1b4a4549476e2dbbd5b878ec3b3c0ddefcae15b04db03303aad8a31ef17e4e0681b02e864a57e4db4cbbb56cc6b15cf3742b0452"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-46a2c1b3a61f544b8d74f6bd1b4a4549476e2dbbd5b878ec3b3c0ddefcae15b04db03303aad8a31ef17e4e0681b02e864a57e4db4cbbb56cc6b15cf3742b0452"' :
                                        'id="xs-injectables-links-module-AuthModule-46a2c1b3a61f544b8d74f6bd1b4a4549476e2dbbd5b878ec3b3c0ddefcae15b04db03303aad8a31ef17e4e0681b02e864a57e4db4cbbb56cc6b15cf3742b0452"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocalStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ChoresModule.html" data-type="entity-link" >ChoresModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ChoresModule-9e25cfa9d5b618d9e64084f24da3b0db5727fdd2e79aeff0b5a99373b00576bf1cc5ee13eafbdf7f989d2785911b161f9986357453b6fffa638ccd3bbb804a2e"' : 'data-target="#xs-controllers-links-module-ChoresModule-9e25cfa9d5b618d9e64084f24da3b0db5727fdd2e79aeff0b5a99373b00576bf1cc5ee13eafbdf7f989d2785911b161f9986357453b6fffa638ccd3bbb804a2e"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ChoresModule-9e25cfa9d5b618d9e64084f24da3b0db5727fdd2e79aeff0b5a99373b00576bf1cc5ee13eafbdf7f989d2785911b161f9986357453b6fffa638ccd3bbb804a2e"' :
                                            'id="xs-controllers-links-module-ChoresModule-9e25cfa9d5b618d9e64084f24da3b0db5727fdd2e79aeff0b5a99373b00576bf1cc5ee13eafbdf7f989d2785911b161f9986357453b6fffa638ccd3bbb804a2e"' }>
                                            <li class="link">
                                                <a href="controllers/ChoresController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChoresController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ChoresModule-9e25cfa9d5b618d9e64084f24da3b0db5727fdd2e79aeff0b5a99373b00576bf1cc5ee13eafbdf7f989d2785911b161f9986357453b6fffa638ccd3bbb804a2e"' : 'data-target="#xs-injectables-links-module-ChoresModule-9e25cfa9d5b618d9e64084f24da3b0db5727fdd2e79aeff0b5a99373b00576bf1cc5ee13eafbdf7f989d2785911b161f9986357453b6fffa638ccd3bbb804a2e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ChoresModule-9e25cfa9d5b618d9e64084f24da3b0db5727fdd2e79aeff0b5a99373b00576bf1cc5ee13eafbdf7f989d2785911b161f9986357453b6fffa638ccd3bbb804a2e"' :
                                        'id="xs-injectables-links-module-ChoresModule-9e25cfa9d5b618d9e64084f24da3b0db5727fdd2e79aeff0b5a99373b00576bf1cc5ee13eafbdf7f989d2785911b161f9986357453b6fffa638ccd3bbb804a2e"' }>
                                        <li class="link">
                                            <a href="injectables/ChoresService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChoresService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/HealthModule.html" data-type="entity-link" >HealthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-HealthModule-983b4b9f5ca5803c045a0a9210e31e2e5205e85b0e646bdbf7e3197208034076d7f869ad55b22675edf8deaf7f936a34809da58be3304f7a92d2c182d5b5550b"' : 'data-target="#xs-controllers-links-module-HealthModule-983b4b9f5ca5803c045a0a9210e31e2e5205e85b0e646bdbf7e3197208034076d7f869ad55b22675edf8deaf7f936a34809da58be3304f7a92d2c182d5b5550b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-HealthModule-983b4b9f5ca5803c045a0a9210e31e2e5205e85b0e646bdbf7e3197208034076d7f869ad55b22675edf8deaf7f936a34809da58be3304f7a92d2c182d5b5550b"' :
                                            'id="xs-controllers-links-module-HealthModule-983b4b9f5ca5803c045a0a9210e31e2e5205e85b0e646bdbf7e3197208034076d7f869ad55b22675edf8deaf7f936a34809da58be3304f7a92d2c182d5b5550b"' }>
                                            <li class="link">
                                                <a href="controllers/HealthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HealthController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ListsModule.html" data-type="entity-link" >ListsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ListsModule-d1fc5ebf24241c7f4a58fa1e8f1623bb9cad7f785142568f3692e75a83a5e27068fad6175bf72c3c847b56d1c162987dd86e944aec11bd3675806cf6454a3359"' : 'data-target="#xs-controllers-links-module-ListsModule-d1fc5ebf24241c7f4a58fa1e8f1623bb9cad7f785142568f3692e75a83a5e27068fad6175bf72c3c847b56d1c162987dd86e944aec11bd3675806cf6454a3359"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ListsModule-d1fc5ebf24241c7f4a58fa1e8f1623bb9cad7f785142568f3692e75a83a5e27068fad6175bf72c3c847b56d1c162987dd86e944aec11bd3675806cf6454a3359"' :
                                            'id="xs-controllers-links-module-ListsModule-d1fc5ebf24241c7f4a58fa1e8f1623bb9cad7f785142568f3692e75a83a5e27068fad6175bf72c3c847b56d1c162987dd86e944aec11bd3675806cf6454a3359"' }>
                                            <li class="link">
                                                <a href="controllers/ListsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ListsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ListsModule-d1fc5ebf24241c7f4a58fa1e8f1623bb9cad7f785142568f3692e75a83a5e27068fad6175bf72c3c847b56d1c162987dd86e944aec11bd3675806cf6454a3359"' : 'data-target="#xs-injectables-links-module-ListsModule-d1fc5ebf24241c7f4a58fa1e8f1623bb9cad7f785142568f3692e75a83a5e27068fad6175bf72c3c847b56d1c162987dd86e944aec11bd3675806cf6454a3359"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ListsModule-d1fc5ebf24241c7f4a58fa1e8f1623bb9cad7f785142568f3692e75a83a5e27068fad6175bf72c3c847b56d1c162987dd86e944aec11bd3675806cf6454a3359"' :
                                        'id="xs-injectables-links-module-ListsModule-d1fc5ebf24241c7f4a58fa1e8f1623bb9cad7f785142568f3692e75a83a5e27068fad6175bf72c3c847b56d1c162987dd86e944aec11bd3675806cf6454a3359"' }>
                                        <li class="link">
                                            <a href="injectables/ListsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ListsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RoomsModule.html" data-type="entity-link" >RoomsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-RoomsModule-1b7ab947c9a979664805e7fdce0bfa8c2d7d65c4225cc513e3edf2263cf439ba86d6c7d8e922ba53a9c3a346ffbc3ba18907fb54e91b4040d937838f4da44dd1"' : 'data-target="#xs-controllers-links-module-RoomsModule-1b7ab947c9a979664805e7fdce0bfa8c2d7d65c4225cc513e3edf2263cf439ba86d6c7d8e922ba53a9c3a346ffbc3ba18907fb54e91b4040d937838f4da44dd1"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-RoomsModule-1b7ab947c9a979664805e7fdce0bfa8c2d7d65c4225cc513e3edf2263cf439ba86d6c7d8e922ba53a9c3a346ffbc3ba18907fb54e91b4040d937838f4da44dd1"' :
                                            'id="xs-controllers-links-module-RoomsModule-1b7ab947c9a979664805e7fdce0bfa8c2d7d65c4225cc513e3edf2263cf439ba86d6c7d8e922ba53a9c3a346ffbc3ba18907fb54e91b4040d937838f4da44dd1"' }>
                                            <li class="link">
                                                <a href="controllers/RoomsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoomsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-RoomsModule-1b7ab947c9a979664805e7fdce0bfa8c2d7d65c4225cc513e3edf2263cf439ba86d6c7d8e922ba53a9c3a346ffbc3ba18907fb54e91b4040d937838f4da44dd1"' : 'data-target="#xs-injectables-links-module-RoomsModule-1b7ab947c9a979664805e7fdce0bfa8c2d7d65c4225cc513e3edf2263cf439ba86d6c7d8e922ba53a9c3a346ffbc3ba18907fb54e91b4040d937838f4da44dd1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RoomsModule-1b7ab947c9a979664805e7fdce0bfa8c2d7d65c4225cc513e3edf2263cf439ba86d6c7d8e922ba53a9c3a346ffbc3ba18907fb54e91b4040d937838f4da44dd1"' :
                                        'id="xs-injectables-links-module-RoomsModule-1b7ab947c9a979664805e7fdce0bfa8c2d7d65c4225cc513e3edf2263cf439ba86d6c7d8e922ba53a9c3a346ffbc3ba18907fb54e91b4040d937838f4da44dd1"' }>
                                        <li class="link">
                                            <a href="injectables/RoomsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoomsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TasksModule.html" data-type="entity-link" >TasksModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-TasksModule-f3ba2b8c007e4d425a8b5a8a9e0082c72fea068a2682a0cbbf5e9cb7d9d04498be9c97d444814ecdca7b66722d197a307c90ef574fbf4f511eacd711fc54a6ec"' : 'data-target="#xs-controllers-links-module-TasksModule-f3ba2b8c007e4d425a8b5a8a9e0082c72fea068a2682a0cbbf5e9cb7d9d04498be9c97d444814ecdca7b66722d197a307c90ef574fbf4f511eacd711fc54a6ec"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TasksModule-f3ba2b8c007e4d425a8b5a8a9e0082c72fea068a2682a0cbbf5e9cb7d9d04498be9c97d444814ecdca7b66722d197a307c90ef574fbf4f511eacd711fc54a6ec"' :
                                            'id="xs-controllers-links-module-TasksModule-f3ba2b8c007e4d425a8b5a8a9e0082c72fea068a2682a0cbbf5e9cb7d9d04498be9c97d444814ecdca7b66722d197a307c90ef574fbf4f511eacd711fc54a6ec"' }>
                                            <li class="link">
                                                <a href="controllers/TasksController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TasksController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-TasksModule-f3ba2b8c007e4d425a8b5a8a9e0082c72fea068a2682a0cbbf5e9cb7d9d04498be9c97d444814ecdca7b66722d197a307c90ef574fbf4f511eacd711fc54a6ec"' : 'data-target="#xs-injectables-links-module-TasksModule-f3ba2b8c007e4d425a8b5a8a9e0082c72fea068a2682a0cbbf5e9cb7d9d04498be9c97d444814ecdca7b66722d197a307c90ef574fbf4f511eacd711fc54a6ec"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TasksModule-f3ba2b8c007e4d425a8b5a8a9e0082c72fea068a2682a0cbbf5e9cb7d9d04498be9c97d444814ecdca7b66722d197a307c90ef574fbf4f511eacd711fc54a6ec"' :
                                        'id="xs-injectables-links-module-TasksModule-f3ba2b8c007e4d425a8b5a8a9e0082c72fea068a2682a0cbbf5e9cb7d9d04498be9c97d444814ecdca7b66722d197a307c90ef574fbf4f511eacd711fc54a6ec"' }>
                                        <li class="link">
                                            <a href="injectables/TasksService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TasksService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UsersModule-c959751f5f2a2e7e577d42e7edd86188c25f15a30a214d700b9b6d853c5899dcd0a2d283736bf59c330119a5767c2c06394330967b83de54f5bdfd7c70129d7b"' : 'data-target="#xs-controllers-links-module-UsersModule-c959751f5f2a2e7e577d42e7edd86188c25f15a30a214d700b9b6d853c5899dcd0a2d283736bf59c330119a5767c2c06394330967b83de54f5bdfd7c70129d7b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-c959751f5f2a2e7e577d42e7edd86188c25f15a30a214d700b9b6d853c5899dcd0a2d283736bf59c330119a5767c2c06394330967b83de54f5bdfd7c70129d7b"' :
                                            'id="xs-controllers-links-module-UsersModule-c959751f5f2a2e7e577d42e7edd86188c25f15a30a214d700b9b6d853c5899dcd0a2d283736bf59c330119a5767c2c06394330967b83de54f5bdfd7c70129d7b"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UsersModule-c959751f5f2a2e7e577d42e7edd86188c25f15a30a214d700b9b6d853c5899dcd0a2d283736bf59c330119a5767c2c06394330967b83de54f5bdfd7c70129d7b"' : 'data-target="#xs-injectables-links-module-UsersModule-c959751f5f2a2e7e577d42e7edd86188c25f15a30a214d700b9b6d853c5899dcd0a2d283736bf59c330119a5767c2c06394330967b83de54f5bdfd7c70129d7b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-c959751f5f2a2e7e577d42e7edd86188c25f15a30a214d700b9b6d853c5899dcd0a2d283736bf59c330119a5767c2c06394330967b83de54f5bdfd7c70129d7b"' :
                                        'id="xs-injectables-links-module-UsersModule-c959751f5f2a2e7e577d42e7edd86188c25f15a30a214d700b9b6d853c5899dcd0a2d283736bf59c330119a5767c2c06394330967b83de54f5bdfd7c70129d7b"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#entities-links"' :
                                'data-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/BaseEntity.html" data-type="entity-link" >BaseEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/List.html" data-type="entity-link" >List</a>
                                </li>
                                <li class="link">
                                    <a href="entities/RefreshToken.html" data-type="entity-link" >RefreshToken</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Room.html" data-type="entity-link" >Room</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Task.html" data-type="entity-link" >Task</a>
                                </li>
                                <li class="link">
                                    <a href="entities/User.html" data-type="entity-link" >User</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Chore.html" data-type="entity-link" >Chore</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateChoreDto.html" data-type="entity-link" >CreateChoreDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateListDto.html" data-type="entity-link" >CreateListDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateRoomDto.html" data-type="entity-link" >CreateRoomDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTaskDto.html" data-type="entity-link" >CreateTaskDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/DatabaseSeeder.html" data-type="entity-link" >DatabaseSeeder</a>
                            </li>
                            <li class="link">
                                <a href="classes/ListFactory.html" data-type="entity-link" >ListFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginUserBody.html" data-type="entity-link" >LoginUserBody</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginUserResponse.html" data-type="entity-link" >LoginUserResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/Migration20220926031634.html" data-type="entity-link" >Migration20220926031634</a>
                            </li>
                            <li class="link">
                                <a href="classes/Migration20220926213133.html" data-type="entity-link" >Migration20220926213133</a>
                            </li>
                            <li class="link">
                                <a href="classes/Migration20220926214650.html" data-type="entity-link" >Migration20220926214650</a>
                            </li>
                            <li class="link">
                                <a href="classes/Migration20220926222224.html" data-type="entity-link" >Migration20220926222224</a>
                            </li>
                            <li class="link">
                                <a href="classes/Migration20220926231541.html" data-type="entity-link" >Migration20220926231541</a>
                            </li>
                            <li class="link">
                                <a href="classes/Migration20221013014335.html" data-type="entity-link" >Migration20221013014335</a>
                            </li>
                            <li class="link">
                                <a href="classes/Migration20221023001353.html" data-type="entity-link" >Migration20221023001353</a>
                            </li>
                            <li class="link">
                                <a href="classes/Migration20221031000536.html" data-type="entity-link" >Migration20221031000536</a>
                            </li>
                            <li class="link">
                                <a href="classes/Migration20221129042732.html" data-type="entity-link" >Migration20221129042732</a>
                            </li>
                            <li class="link">
                                <a href="classes/RedisIoAdapter.html" data-type="entity-link" >RedisIoAdapter</a>
                            </li>
                            <li class="link">
                                <a href="classes/RefreshTokenBody.html" data-type="entity-link" >RefreshTokenBody</a>
                            </li>
                            <li class="link">
                                <a href="classes/RefreshTokenResponse.html" data-type="entity-link" >RefreshTokenResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegisterUserBody.html" data-type="entity-link" >RegisterUserBody</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegisterUserResponse.html" data-type="entity-link" >RegisterUserResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/TaskFactory.html" data-type="entity-link" >TaskFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/TasksGateway.html" data-type="entity-link" >TasksGateway</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateChoreDto.html" data-type="entity-link" >UpdateChoreDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateListDto.html" data-type="entity-link" >UpdateListDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateProfileDto.html" data-type="entity-link" >UpdateProfileDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateRoomDto.html" data-type="entity-link" >UpdateRoomDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateTaskDto.html" data-type="entity-link" >UpdateTaskDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserDto.html" data-type="entity-link" >UserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserFactory.html" data-type="entity-link" >UserFactory</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalAuthGuard.html" data-type="entity-link" >LocalAuthGuard</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/FindAllArgs.html" data-type="entity-link" >FindAllArgs</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FindAllArgs-1.html" data-type="entity-link" >FindAllArgs</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FindAllArgs-2.html" data-type="entity-link" >FindAllArgs</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FindOneArgs.html" data-type="entity-link" >FindOneArgs</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FindOneArgs-1.html" data-type="entity-link" >FindOneArgs</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FindOneArgs-2.html" data-type="entity-link" >FindOneArgs</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});