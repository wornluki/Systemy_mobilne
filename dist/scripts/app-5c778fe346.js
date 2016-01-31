!function(){"use strict";angular.module("web",["restangular","ui.router","ngMaterial","firebase"])}(),function(){"use strict";function e(e){var t=new Firebase(e),i={root:t,users:t.child("users"),lists:t.child("lists")};return i}angular.module("web").factory("firebaseDataService",e),e.$inject=["FIREBASE_URL"]}(),function(){"use strict";function e(e,t){function i(e){var i=t.users.child(e).child("lists"),n=[];return i.on("child_added",function(e){var i=e.key();t.lists.child(i).once("value",function(e){var t=e.exportVal();console.log(t.name),n.push(t.name)})}),n}function n(e){return t.lists.child(e).child("items")}var s={getListsByUser:i,getItemsRef:n};return s}angular.module("web").factory("listService",e),e.$inject=["$firebaseArray","firebaseDataService"]}(),function(){"use strict";function e(e){var t=new Firebase("https://vivid-torch-6869.firebaseio.com/");return e(t)}angular.module("web").factory("Auth",e),e.$inject=["$firebaseAuth"]}(),function(){"use strict";function e(e,t,i,n){var s=new Firebase("https://vivid-torch-6869.firebaseio.com/"),r=s.child("users");console.log(r),e.registerUser=function(){e.error=null,n.$createUser({email:e.email,password:e.password}).then(function(i){r.child(i.uid).set({id:e.email.replace(/@.*/,""),email:e.email}),console.log(i),t.go("home")})["catch"](function(t){e.error=t,console.log(t)})}}angular.module("web").controller("RegisterController",e),e.$inject=["$scope","$state","$location","Auth"]}(),function(){"use strict";function e(e,t,i,n,s,r,o){function a(e,i){d.items=t(n.lists.child(e).child("items")),d.select=e}function l(){var t=s.getItemsRef(d.select);console.log(d.select),t.child(e.nameText).set({name:e.nameText,quanity:e.quanityText,addedByUser:r.password.email,completed:!1}),console.log(r),e.nameListText="",e.nameText="",e.quanityText=""}function c(){n.lists.child(e.nameListText).set({name:e.nameListText,items:[]}),n.users.child(r.uid).child("lists").child(e.nameListText).set(!0),e.nameListText=""}function u(){o.$unauth(),i.go("login")}function m(){e.auth=o,e.auth.$onAuth(function(t){e.authData=t})}var d=this;m(),d.selectAction2=a,d.addItem=l,d.select="Lista1",d.lists=s.getListsByUser(r.uid),d.items=t(n.lists.child(d.select).child("items")),d.addList=c,d.logout=u}angular.module("web").controller("MainController",e),e.$inject=["$scope","$firebaseArray","$state","firebaseDataService","listService","currentAuth","Auth"]}(),function(){"use strict";function e(e,t,i){e.loginUser=function(){i.$authWithPassword({email:e.email,password:e.password}).then(function(e){console.log("Logged in as:",e.password.email),t.go("home")})["catch"](function(e){console.error("Authentication failed:",e)})}}angular.module("web").controller("LoginController",e),e.$inject=["$scope","$state","Auth"]}(),function(){"use strict";function e(e,t){e.$on("$stateChangeError",function(e,i,n,s,r,o){"AUTH_REQUIRED"===o&&t.go("login")})}angular.module("web").run(e),e.$inject=["$rootScope","$state"]}(),function(){"use strict";function e(e,t){e.state("login",{url:"/login",templateUrl:"app/login/login.html",controller:"LoginController",controllerAs:"login"}),e.state("register",{url:"/register",templateUrl:"app/register/register.html",controller:"RegisterController",controllerAs:"register"}),e.state("home",{url:"/",templateUrl:"app/main/main.html",controller:"MainController",controllerAs:"vm",resolve:{currentAuth:["Auth",function(e){return e.$requireAuth()}]}}),t.otherwise("/")}angular.module("web").config(e),e.$inject=["$stateProvider","$urlRouterProvider"]}(),function(){"use strict";angular.module("web").constant("FIREBASE_URL","https://vivid-torch-6869.firebaseio.com/")}(),function(){"use strict";function e(){}angular.module("web").config(e)}(),angular.module("web").run(["$templateCache",function(e){e.put("app/login/login.html",'<div class="login-wrapper"><div class="login-form"><h2>SHOPING LIST</h2><div class="inputs"><input type="email" placeholder="email" ng-model="email"> <input type="password" placeholder="password" ng-model="password"></div><div class="buttons"><button ng-click="loginUser()" type="submit">Sign in</button><p><a href="#/register">Sign up</a></p></div></div></div>'),e.put("app/main/main.html",'<header class="header"><p class="logo">SHOPING LIST</p><div class="user"><i class="fa fa-cog"></i><p class="user_name">{{ authData.password.email }}</p></div></header><div class="wrapper"><div class="lists"><h2>LISTS</h2><div class="list-buttons"><p class="list-name" ng-class="{active:$first}" ng-repeat="item in vm.lists" ng-click="vm.selectAction2(item, $event)">{{ item }}</p></div><div class="add-list"><form ng-submit="vm.addList()"><input type="text" class="white" placeholder="Dodaj listę" ng-model="nameListText"></form></div><md-button ng-click="vm.logout()" class="md-raised md-warn">Logout</md-button></div><div class="list"><div class="add-item"><form ng-submit="vm.addItem()"><input type="text" placeholder="Name" ng-model="nameText"> <input type="number" placeholder="Quanity" value="1" max="10" ng-model="quanityText"><md-button type="submit" class="md-raised">Add</md-button></form></div><div class="items"><div class="item" ng-repeat="item in vm.items"><input type="text" ng-model="item.name" ng-change="vm.items.$save(item)"> <input type="number" ng-model="item.quanity" ng-change="vm.items.$save(item)"><md-button ng-click="vm.items.$remove(item)" class="md-raised md-warn">Delete</md-button></div></div></div></div>'),e.put("app/register/register.html",'<form ng-submit="registerUser()"><md-input-container><label>Email</label> <input type="email" ng-model="email"></md-input-container><md-input-container><label>Password</label> <input type="text" ng-model="password"></md-input-container><button type="submit">Register user</button></form>')}]);