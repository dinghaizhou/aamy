"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/classCallCheck"));

var _includes = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/includes"));

var a = 11;
var b = [1, 2, 3, 4];
(0, _includes["default"])(b).call(b, function (item) {
  return item * 3;
});

var Person = function Person() {
  (0, _classCallCheck2["default"])(this, Person);
};

var Person2 = function Person2() {
  (0, _classCallCheck2["default"])(this, Person2);
};

var Person3 = function Person3() {
  (0, _classCallCheck2["default"])(this, Person3);
};
