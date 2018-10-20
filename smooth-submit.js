/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __assign = (this && this.__assign) || function () {\r\n    __assign = Object.assign || function(t) {\r\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\r\n            s = arguments[i];\r\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\r\n                t[p] = s[p];\r\n        }\r\n        return t;\r\n    };\r\n    return __assign.apply(this, arguments);\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar $ = __webpack_require__(/*! jquery */ \"jquery\");\r\nvar send = function (settings) { return new Promise(function (success, error) {\r\n    settings.success = success;\r\n    settings.error = error;\r\n    $.ajax(settings);\r\n}); };\r\n$(document).on('submit click', '.smooth-submit', function (e) {\r\n    e.preventDefault();\r\n    var target = e.currentTarget;\r\n    var options = __assign({}, target.smoothSubmitOptions);\r\n    var ajaxSettings = {};\r\n    var action = options.action, type = options.type, preConfirm = options.preConfirm;\r\n    var data;\r\n    switch (target.tagName.toLowerCase()) {\r\n        case 'form':\r\n            action = $(target).attr('action') || action;\r\n            type = $(target).attr('method') || type;\r\n            // @ts-ignore\r\n            data = new FormData(target);\r\n            ajaxSettings.cache = false;\r\n            ajaxSettings.processData = false;\r\n            ajaxSettings.contentType = false;\r\n            break;\r\n        case 'a':\r\n        case 'button':\r\n            action = $(target).attr('href') || action;\r\n            type = $(target).attr('method') || type;\r\n            break;\r\n    }\r\n    ajaxSettings.url = action;\r\n    ajaxSettings.type = type;\r\n    ajaxSettings.data = data;\r\n    var confirmPromise = $.Deferred();\r\n    if (preConfirm) {\r\n        preConfirm(target, data).then(confirmPromise.resolve, confirmPromise.reject);\r\n    }\r\n    else {\r\n        confirmPromise.resolve();\r\n    }\r\n    confirmPromise.promise().then(function () {\r\n        send(ajaxSettings).then(function (data) {\r\n            $(target).trigger('aftersubmit', [data]);\r\n        });\r\n    });\r\n});\r\n// @ts-ignore\r\n$.fn.smoothSubmit = function (options) {\r\n    $.each(this, function () {\r\n        this.smoothSubmitOptions = options;\r\n    });\r\n    return this;\r\n};\r\n//# sourceMappingURL=index.js.map\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = jQuery;\n\n//# sourceURL=webpack:///external_%22jQuery%22?");

/***/ })

/******/ });