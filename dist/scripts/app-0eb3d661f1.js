!function(){"use strict";angular.module("web",["restangular","ui.router","ngMaterial","firebase"])}(),function(){"use strict";function t(){function t(){return e}var e=[{title:"AngularJS",url:"https://angularjs.org/",description:"HTML enhanced for web apps!",logo:"angular.png"},{title:"BrowserSync",url:"http://browsersync.io/",description:"Time-saving synchronised browser testing.",logo:"browsersync.png"},{title:"GulpJS",url:"http://gulpjs.com/",description:"The streaming build system.",logo:"gulp.png"},{title:"Jasmine",url:"http://jasmine.github.io/",description:"Behavior-Driven JavaScript.",logo:"jasmine.png"},{title:"Karma",url:"http://karma-runner.github.io/",description:"Spectacular Test Runner for JavaScript.",logo:"karma.png"},{title:"Protractor",url:"https://github.com/angular/protractor",description:"End to end test framework for AngularJS applications built on top of WebDriverJS.",logo:"protractor.png"},{title:"Angular Material Design",url:"https://material.angularjs.org/#/",description:"The Angular reference implementation of the Google's Material Design specification.",logo:"angular-material.png"},{title:"Sass (Node)",url:"https://github.com/sass/node-sass",description:"Node.js binding to libsass, the C version of the popular stylesheet preprocessor, Sass.",logo:"node-sass.png"},{key:"jade",title:"Jade",url:"http://jade-lang.com/",description:"Jade is a high performance template engine heavily influenced by Haml and implemented with JavaScript for node.",logo:"jade.png"}];this.getTec=t}angular.module("web").service("webDevTec",t)}(),function(){"use strict";function t(){function t(t){var e=this;e.relativeDate=t(e.creationDate).fromNow()}var e={restrict:"E",templateUrl:"app/components/navbar/navbar.html",scope:{creationDate:"="},controller:t,controllerAs:"vm",bindToController:!0};return t.$inject=["moment"],e}angular.module("web").directive("acmeNavbar",t)}(),function(){"use strict";function t(t){function e(e,n,o,r){var i,a=t(n[0],{typeSpeed:40,deleteSpeed:40,pauseDelay:800,loop:!0,postfix:" "});n.addClass("acme-malarkey"),angular.forEach(e.extraValues,function(t){a.type(t).pause()["delete"]()}),i=e.$watch("vm.contributors",function(){angular.forEach(r.contributors,function(t){a.type(t.login).pause()["delete"]()})}),e.$on("$destroy",function(){i()})}function n(t,e){function n(){return o().then(function(){t.info("Activated Contributors View")})}function o(){return e.getContributors(10).then(function(t){return r.contributors=t,r.contributors})}var r=this;r.contributors=[],n()}var o={restrict:"E",scope:{extraValues:"="},template:"&nbsp;",link:e,controller:n,controllerAs:"vm"};return n.$inject=["$log","githubContributor"],o}angular.module("web").directive("acmeMalarkey",t),t.$inject=["malarkey"]}(),function(){"use strict";function t(t,e){function n(n){function r(t){return t.data}function i(e){t.error("XHR Failed for getContributors.\n"+angular.toJson(e.data,!0))}return n||(n=30),e.get(o+"/contributors?per_page="+n).then(r)["catch"](i)}var o="https://api.github.com/repos/Swiip/generator-gulp-angular",r={apiHost:o,getContributors:n};return r}angular.module("web").factory("githubContributor",t),t.$inject=["$log","$http"]}(),function(){"use strict";function t(t){var e=new Firebase("https://vivid-torch-6869.firebaseio.com/");return t(e)}angular.module("web").factory("Auth",t),t.$inject=["$firebaseAuth"]}(),function(){"use strict";function t(t,e,n){t.createUser=function(){t.error=null,n.$createUser({email:t.email,password:t.password}).then(function(){e.path("/#login")})["catch"](function(e){t.error=e})}}angular.module("web").controller("RegisterController",t),t.$inject=["$scope","$location","Auth"]}(),function(){"use strict";function t(t,e){var n=new Firebase("hhttps://vivid-torch-6869.firebaseio.com");t.items=e(n),t.addItem=function(){t.items.$add({name:t.nameText,quanity:t.quanityText})}}angular.module("web").controller("MainController",t),t.$inject=["$scope","$firebaseArray"]}(),function(){"use strict";function t(t,e,n){t.loginUser=function(){n.$authWithPassword({email:t.email,password:t.password}).then(function(t){console.log("Logged in as:",t.password.email),e.path("/")})["catch"](function(t){console.error("Authentication failed:",t)})}}angular.module("web").controller("LoginController",t),t.$inject=["$scope","$location","Auth"]}(),function(){"use strict";function t(t){t.debug("runBlock end")}angular.module("web").run(t),t.$inject=["$log"]}(),function(){"use strict";function t(t,e){t.state("login",{url:"/login",templateUrl:"app/login/login.html",controller:"LoginController",controllerAs:"login"}),t.state("register",{url:"/register",templateUrl:"app/register/register.html",controller:"RegisterController",controllerAs:"register"}),t.state("home",{url:"/",templateUrl:"app/main/main.html",controller:"MainController",controllerAs:"main"}),e.otherwise("/")}angular.module("web").config(t),t.$inject=["$stateProvider","$urlRouterProvider"]}(),function(){"use strict";angular.module("web").constant("malarkey",malarkey).constant("toastr",toastr).constant("moment",moment)}(),function(){"use strict";function t(t,e){t.debugEnabled(!0),e.options.timeOut=3e3,e.options.positionClass="toast-top-right",e.options.preventDuplicates=!0,e.options.progressBar=!0}angular.module("web").config(t),t.$inject=["$logProvider","toastr"]}(),angular.module("web").run(["$templateCache",function(t){t.put("app/login/login.html",'<h2>Zaloguj się!</h2><form ng-submit="loginUser()"><md-input-container><label>Email</label> <input type="email" ng-model="email"></md-input-container><md-input-container><label>Password</label> <input type="text" ng-model="password"></md-input-container><button type="submit">Login user</button></form><p>Jeżeli nie masz jeszcze konta, <a href="#/register">zarejestruj się!</a></p>'),t.put("app/main/main.html",'<md-content layout-padding=""><md-list><md-list-item class="md-2-line" ng-repeat="item in items"><md-content layout-padding="" layout="row"><md-input-container><input type="text" ng-model="item.name" ng-change="items.$save(item)"></md-input-container><md-input-container><input type="number" ng-model="item.quanity" ng-change="items.$save(item)"></md-input-container><md-input-container><md-button ng-click="items.$remove(item)" class="md-raised md-warn">Delete</md-button></md-input-container></md-content></md-list-item></md-list><form ng-submit="addItem()"><md-input-container><label>Name</label> <input type="text" ng-model="nameText"></md-input-container><md-input-container><label>Quanity</label> <input type="number" value="1" max="10" ng-model="quanityText"></md-input-container><button type="submit">Add</button></form></md-content>'),t.put("app/register/register.html",'<form ng-submit="registerUser()"><md-input-container><label>Email</label> <input type="email" ng-model="email"></md-input-container><md-input-container><label>Password</label> <input type="text" ng-model="password"></md-input-container><button type="submit">Login user</button></form>'),t.put("app/components/navbar/navbar.html",'<md-toolbar layout="row" layout-align="center center"><md-button href="https://github.com/Swiip/generator-gulp-angular">Gulp Angular</md-button><section flex="" layout="row" layout-align="left center"><md-button href="#" class="md-raised">Home</md-button><md-button href="#" class="md-raised">About</md-button><md-button href="#" class="md-raised">Contact</md-button></section><md-button class="acme-navbar-text">Application was created {{ vm.relativeDate }}.</md-button></md-toolbar>')}]);