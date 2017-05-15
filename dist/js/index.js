/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _matrix = __webpack_require__(1);

var _matrix2 = _interopRequireDefault(_matrix);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* @Author: liuyany.liu <lyan>
* @Date:   2017-03-20 23:02:51
* @Last modified by:   lyan
* @Last modified time: 2017-04-05 22:59:11
*/

var canvas = document.querySelector('#myCanvas');
var ctx = canvas.getContext('2d');
var x = 20,
    y = 40;


var tm = [1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, 0, 0, 0, 0, 1];

var sm = [2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];

// p, p1 对角点决定了一个长方形
var p = [100, 100, 0, 1];
var p1 = [p[0] + 25, p[1] + 50, 0, 1];
ctx.fillRect(p[0], p[1], p1[0] - p[0], p1[1] - p[1]);

// p 点
// 平移
var t = _matrix2.default.multi(tm, p);
// 缩放
var ts = _matrix2.default.multi(sm, t);

// p1 点
var t1 = _matrix2.default.multi(tm, p1);
var ts2 = _matrix2.default.multi(sm, t1);

ctx.fillStyle = "rgba(0,0,0, 0.5)";

console.log(ts[0], ts[1], ts2[0] - ts[0], ts2[1] - ts[1]);
ctx.fillRect(ts[0], ts[1], ts2[0] - ts[0], ts2[1] - ts[1]);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

/**
* @Author: liuyany.liu <lyan>
* @Date:   2017-03-21 23:39:35
* @Last modified by:   lyan
* @Last modified time: 2017-03-22 23:47:29
*/

exports.default = {
    /**
     * 原向量左乘变换矩阵
     * @param  {[type]} m      [description]
     * @param  {[type]} vector [description]
     * @return {[type]}        [description]
     */
    multi: function multi(m, vector) {
        var _m = _slicedToArray(m, 16),
            m11 = _m[0],
            m12 = _m[1],
            m13 = _m[2],
            m14 = _m[3],
            m21 = _m[4],
            m22 = _m[5],
            m23 = _m[6],
            m24 = _m[7],
            m31 = _m[8],
            m32 = _m[9],
            m33 = _m[10],
            m34 = _m[11],
            m41 = _m[12],
            m42 = _m[13],
            m43 = _m[14],
            m44 = _m[15];

        var _vector = _slicedToArray(vector, 4),
            x = _vector[0],
            y = _vector[1],
            z = _vector[2],
            k = _vector[3];

        return [m11 * x + m12 * y + m13 * z + m14 * k, m21 * x + m22 * y + m23 * z + m24 * k, m31 * x + m32 * y + m33 * z + m34 * k, m41 * x + m42 * y + m43 * z + m44 * k];
    }
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

/***/ })
/******/ ]);