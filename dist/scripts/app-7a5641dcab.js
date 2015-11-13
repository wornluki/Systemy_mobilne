!function(){"use strict";angular.module("web",["restangular","ui.router","ngMaterial","firebase"])}(),function(){"use strict";function t(t){var e=new Firebase("https://vivid-torch-6869.firebaseio.com/");return t(e)}angular.module("web").factory("Auth",t),t.$inject=["$firebaseAuth"]}(),function(){"use strict";function t(t,e){function n(t){var n=e.users.child(t).child("lists"),i=[];return n.on("child_added",function(t){var n=t.key();e.lists.child(n).once("value",function(t){var e=t.exportVal();console.log(e.name),i.push(e.name)})}),i}function i(t){return e.lists.child(t).child("items")}var a={getListsByUser:n,getItemsRef:i};return a}angular.module("web").factory("listService",t),t.$inject=["$firebaseArray","firebaseDataService"]}(),function(){"use strict";function t(t){var e=new Firebase(t),n={root:e,users:e.child("users"),lists:e.child("lists")};return n}angular.module("web").factory("firebaseDataService",t),t.$inject=["FIREBASE_URL"]}(),function(){"use strict";function t(t,e,n,i){var a=new Firebase("https://vivid-torch-6869.firebaseio.com/"),s=a.child("users");console.log(s),t.registerUser=function(){t.error=null,i.$createUser({email:t.email,password:t.password}).then(function(n){s.child(n.uid).set({id:t.email.replace(/@.*/,""),email:t.email}),console.log(n),e.go("home")})["catch"](function(e){t.error=e,console.log(e)})}}angular.module("web").controller("RegisterController",t),t.$inject=["$scope","$state","$location","Auth"]}(),function(){"use strict";function t(t,e,n,i,a,s,l){function o(t,n){d.items=e(i.lists.child(t).child("items")),console.log(d.items)}function r(){var e=a.getItemsRef(d.select);console.log(d.items),e.child(t.nameText).set({name:t.nameText,quanity:t.quanityText}),t.nameListText="",t.nameText="",t.quanityText=""}function m(){i.lists.child(t.nameListText).set({name:t.nameListText,items:[]}),i.users.child(s.uid).child("lists").child(t.nameListText).set(!0),t.nameListText=""}function u(){l.$unauth(),n.go("login")}function c(){t.auth=l,t.auth.$onAuth(function(e){t.authData=e})}var d=this;c(),d.selectAction2=o,d.addItem=r,d.select="Lista1",d.lists=a.getListsByUser(s.uid),d.items=e(i.lists.child(d.select).child("items")),d.addList=m,d.logout=u}angular.module("web").controller("MainController",t),t.$inject=["$scope","$firebaseArray","$state","firebaseDataService","listService","currentAuth","Auth"]}(),function(){"use strict";function t(t,e,n){t.loginUser=function(){n.$authWithPassword({email:t.email,password:t.password}).then(function(t){console.log("Logged in as:",t.password.email),e.go("home")})["catch"](function(t){console.error("Authentication failed:",t)})}}angular.module("web").controller("LoginController",t),t.$inject=["$scope","$state","Auth"]}(),function(){"use strict";function t(t,e){t.$on("$stateChangeError",function(t,n,i,a,s,l){"AUTH_REQUIRED"===l&&e.go("login")})}angular.module("web").run(t),t.$inject=["$rootScope","$state"]}(),function(){"use strict";function t(t,e){t.state("login",{url:"/login",templateUrl:"app/login/login.html",controller:"LoginController",controllerAs:"login"}),t.state("register",{url:"/register",templateUrl:"app/register/register.html",controller:"RegisterController",controllerAs:"register"}),t.state("home",{url:"/",templateUrl:"app/main/main.html",controller:"MainController",controllerAs:"vm",resolve:{currentAuth:["Auth",function(t){return t.$requireAuth()}]}}),e.otherwise("/")}angular.module("web").config(t),t.$inject=["$stateProvider","$urlRouterProvider"]}(),function(){"use strict";angular.module("web").constant("FIREBASE_URL","https://vivid-torch-6869.firebaseio.com/")}(),function(){"use strict";function t(){}angular.module("web").config(t)}(),angular.module("web").run(["$templateCache",function(t){t.put("app/login/login.html",'<h2>Zaloguj się!</h2><form ng-submit="loginUser()"><md-input-container><label>Email</label> <input type="email" ng-model="email"></md-input-container><md-input-container><label>Password</label> <input type="text" ng-model="password"></md-input-container><button type="submit">Login user</button></form><p>Jeżeli nie masz jeszcze konta, <a href="#/register">zarejestruj się!</a></p>'),t.put("app/main/main.html",'<header class="header"><p class="logo">SHOPING LIST</p><div class="user"><i class="fa fa-cog"></i><p class="user_name">{{ authData.password.email }}</p></div></header><div class="wrapper"><div class="lists"><h2>LISTS</h2><div class="list-buttons"><p class="list-name" ng-class="{active:$first}" ng-repeat="item in vm.lists" ng-click="vm.selectAction2(item, $event)">{{ item }}</p></div><div class="add-list"><form ng-submit="vm.addList()"><md-input-container><label>Dodaj listę:</label> <input type="text" ng-model="nameListText"></md-input-container></form></div></div><div class="list"><div class="add-item"><form ng-submit="vm.addItem()"><label>Name</label> <input type="text" ng-model="nameText"> <label>Quanity</label> <input type="number" value="1" max="10" ng-model="quanityText"><md-button type="submit" class="md-raised">Add</md-button></form></div><div class="items"><div class="item" ng-repeat="item in vm.items"><input type="text" ng-model="item.name" ng-change="vm.items.$save(item)"> <input type="number" ng-model="item.quanity" ng-change="vm.items.$save(item)"><md-button ng-click="vm.items.$remove(item)" class="md-raised md-warn">Delete</md-button></div></div></div></div><p>//////////</p><md-content layout-padding=""><label for="singleSelect">Single select:</label><select name="singleSelect" ng-change="vm.selectAction()" ng-model="vm.select" ng-options="value as value for value in vm.lists"></select>{{vm.lists}}<md-content class="md-padding"><md-list><md-list-item class="md-2-line" ng-repeat="item in vm.items"><md-content layout-padding="" layout="row"><md-input-container><input type="text" ng-model="item.name" ng-change="vm.items.$save(item)"></md-input-container><md-input-container><input type="number" ng-model="item.quanity" ng-change="vm.items.$save(item)"></md-input-container><md-input-container><md-button ng-click="vm.items.$remove(item)" class="md-raised md-warn">Delete</md-button></md-input-container></md-content></md-list-item></md-list></md-content><h4>Dodaj przedmiot do listy</h4><form ng-submit="vm.addItem()"><md-content layout-padding="" layout="row"><md-input-container><label>Name</label> <input type="text" ng-model="nameText"></md-input-container><md-input-container><label>Quanity</label> <input type="number" value="1" max="10" ng-model="quanityText"></md-input-container><md-button type="submit" class="md-raised">Add</md-button></md-content></form><h4>Dodaj listę:</h4><form ng-submit="vm.addList()"><md-content layout-padding="" layout="row"><md-input-container><label>Name</label> <input type="text" ng-model="nameListText"></md-input-container><md-button type="submit" class="md-raised">Add</md-button></md-content></form></md-content><div ng-show="authData"><p>Hello, {{ authData.password.email }}</p><md-button ng-click="vm.logout" class="md-raised md-warn">Logout</md-button></div>'),t.put("app/register/register.html",'<form ng-submit="registerUser()"><md-input-container><label>Email</label> <input type="email" ng-model="email"></md-input-container><md-input-container><label>Password</label> <input type="text" ng-model="password"></md-input-container><button type="submit">Register user</button></form>')}]);