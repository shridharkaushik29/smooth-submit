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

/***/ "./node_modules/crud-sk/src/index.js":
/*!*******************************************!*\
  !*** ./node_modules/crud-sk/src/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __assign = (this && this.__assign) || function () {\r\n    __assign = Object.assign || function(t) {\r\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\r\n            s = arguments[i];\r\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\r\n                t[p] = s[p];\r\n        }\r\n        return t;\r\n    };\r\n    return __assign.apply(this, arguments);\r\n};\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nvar __importStar = (this && this.__importStar) || function (mod) {\r\n    if (mod && mod.__esModule) return mod;\r\n    var result = {};\r\n    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];\r\n    result[\"default\"] = mod;\r\n    return result;\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar jquery_1 = __importDefault(__webpack_require__(/*! jquery */ \"jquery\"));\r\nvar _ = __importStar(__webpack_require__(/*! lodash */ \"lodash\"));\r\nvar mergeData = function (formData, data, key) {\r\n    if (_.isObject(data) && !(data instanceof File) && !(data instanceof Blob)) {\r\n        _.each(data, function (value, _key) {\r\n            var name = key ? key + \"[\" + _key + \"]\" : _key;\r\n            mergeData(formData, value, name);\r\n        });\r\n    }\r\n    else if (key) {\r\n        formData.append(key, data);\r\n    }\r\n};\r\nFormData.prototype.merge = function (data) {\r\n    mergeData(this, data);\r\n    return this;\r\n};\r\nvar CrudRequest = /** @class */ (function () {\r\n    function CrudRequest() {\r\n        this.$config = {\r\n            baseUrl: \"\",\r\n            callbacks: {\r\n                notify: function (data) {\r\n                    alert(data.message);\r\n                },\r\n                checkSuccess: function (data) {\r\n                    if (data.type === 'success') {\r\n                        return true;\r\n                    }\r\n                    else {\r\n                        return false;\r\n                    }\r\n                }\r\n            }\r\n        };\r\n    }\r\n    CrudRequest.prototype.send = function (options) {\r\n        var _this = this;\r\n        return new Promise(function (resolve, reject) {\r\n            var config = __assign({ checkDataType: true, notify: true }, _this.$config, options);\r\n            var data = config.data, callbacks = config.callbacks, method = config.method, baseUrl = config.baseUrl, url = config.url, redirectTo = config.redirectTo, showProgress = config.showProgress, _a = config.prefix, prefix = _a === void 0 ? \"\" : _a, checkDataType = config.checkDataType;\r\n            var reloadPage = config.reload;\r\n            var loading = callbacks.loading, reload = callbacks.reload, redirect = callbacks.redirect, checkSuccess = callbacks.checkSuccess, notify = callbacks.notify;\r\n            var ajaxOptions = __assign({}, config.ajaxOptions, { success: function (response) {\r\n                    showProgress && loading && loading(false);\r\n                    if (method.toLowerCase() === 'get' || !checkSuccess) {\r\n                        resolve(response);\r\n                    }\r\n                    else if (checkSuccess) {\r\n                        if (checkDataType && checkSuccess(response)) {\r\n                            resolve(response);\r\n                            // @ts-ignore\r\n                            (redirectTo && redirect && redirect(redirectTo, response)) || (reloadPage && reload && reload());\r\n                        }\r\n                        else if (!checkDataType) {\r\n                            resolve(response);\r\n                        }\r\n                        else {\r\n                            reject(response);\r\n                        }\r\n                        var notification = {\r\n                            type: response.type,\r\n                            message: response.message\r\n                        };\r\n                        config.notify && notify && notify(notification);\r\n                    }\r\n                }, error: function (error) {\r\n                    showProgress && loading && loading(false);\r\n                    var notification = {\r\n                        type: \"error\"\r\n                    };\r\n                    notification.message = error.status + \": \" + error.statusText;\r\n                    config.notify && notify && notify(notification);\r\n                    reject(error);\r\n                } });\r\n            ajaxOptions.type = method;\r\n            ajaxOptions.url = baseUrl + prefix + url;\r\n            if (method.toLowerCase() === 'post' && !(data instanceof FormData)) {\r\n                var formData = new FormData().merge(data);\r\n                ajaxOptions.data = formData;\r\n            }\r\n            else {\r\n                ajaxOptions.data = data;\r\n            }\r\n            if (ajaxOptions.data instanceof FormData) {\r\n                ajaxOptions.type = \"post\";\r\n                ajaxOptions.cache = false;\r\n                ajaxOptions.processData = false;\r\n                ajaxOptions.contentType = false;\r\n            }\r\n            showProgress && loading && loading(true);\r\n            jquery_1.default.ajax(ajaxOptions);\r\n        });\r\n    };\r\n    CrudRequest.prototype.create = function (url, data, options) {\r\n        return this.send(__assign({ method: \"post\", prefix: \"create/\" }, options, { url: url, data: data }));\r\n    };\r\n    CrudRequest.prototype.update = function (url, data, options) {\r\n        return this.send(__assign({ method: \"post\", prefix: \"update/\" }, options, { url: url, data: data }));\r\n    };\r\n    CrudRequest.prototype.delete = function (url, data, options) {\r\n        return this.send(__assign({ method: \"post\", prefix: \"delete/\" }, options, { url: url, data: data }));\r\n    };\r\n    CrudRequest.prototype.retrieve = function (url, data, options) {\r\n        return this.send(__assign({ method: \"get\", prefix: \"retrieve/\", checkDataType: false, notify: false }, options, { url: url, data: data }));\r\n    };\r\n    CrudRequest.prototype.alert = function (options) {\r\n        return this.$config.callbacks.alert(options);\r\n    };\r\n    CrudRequest.prototype.confirm = function (options) {\r\n        return this.$config.callbacks.confirm(options);\r\n    };\r\n    CrudRequest.prototype.prompt = function (options) {\r\n        return this.$config.callbacks.prompt(options);\r\n    };\r\n    CrudRequest.prototype.dialog = function (name, options) {\r\n        return this.$config.callbacks.dialog(name, options);\r\n    };\r\n    CrudRequest.prototype.notify = function (options) {\r\n        this.$config.callbacks.notify(options);\r\n    };\r\n    CrudRequest.prototype.chooseFile = function (options) {\r\n        if (options === void 0) { options = {}; }\r\n        var multiple = options.multiple, accept = options.accept;\r\n        var input = document.querySelector('.sk-file-input');\r\n        if (!input) {\r\n            input = document.createElement('input');\r\n            input.type = \"file\";\r\n            input.accept = _.isArray(accept) ? accept.join(\",\") : accept;\r\n            input.multiple = multiple;\r\n            input.style.display = \"none\";\r\n            input.className = \"sk-file-input\";\r\n            document.querySelector(\"body\").appendChild(input);\r\n        }\r\n        jquery_1.default('input').click();\r\n        return new Promise(function (resolve) {\r\n            jquery_1.default(input).one('change', function (e) {\r\n                var files = e.currentTarget.files;\r\n                var filesArray = [];\r\n                _.each(files, function (file) {\r\n                    file.url = URL.createObjectURL(file);\r\n                    filesArray.push(file);\r\n                });\r\n                if (multiple) {\r\n                    resolve(filesArray);\r\n                }\r\n                else {\r\n                    resolve(files[0]);\r\n                }\r\n            });\r\n        });\r\n    };\r\n    return CrudRequest;\r\n}());\r\nexports.CrudRequest = CrudRequest;\r\nwindow.CrudRequest = CrudRequest;\r\n\n\n//# sourceURL=webpack:///./node_modules/crud-sk/src/index.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __assign = (this && this.__assign) || function () {\r\n    __assign = Object.assign || function(t) {\r\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\r\n            s = arguments[i];\r\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\r\n                t[p] = s[p];\r\n        }\r\n        return t;\r\n    };\r\n    return __assign.apply(this, arguments);\r\n};\r\nvar _this = this;\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar $ = __webpack_require__(/*! jquery */ \"jquery\");\r\nvar crud_sk_1 = __webpack_require__(/*! crud-sk */ \"./node_modules/crud-sk/src/index.js\");\r\nvar $crud = new crud_sk_1.CrudRequest();\r\nvar defaultOptions = {};\r\njQuery.crud = function () { return $crud; };\r\njQuery.smoothSubmitConfig = function (options) {\r\n    defaultOptions = options;\r\n    return _this;\r\n};\r\njQuery.fn.smoothSubmit = function (options) {\r\n    $.each(this, function () {\r\n        this.smoothSubmitOptions = options;\r\n    });\r\n    return this;\r\n};\r\n$(document).on('submit click', '.smooth-submit', function (e) {\r\n    // @ts-ignore\r\n    var target = e.currentTarget;\r\n    var options = __assign({}, defaultOptions, target.smoothSubmitOptions);\r\n    var action = options.action, type = options.type, preConfirm = options.preConfirm, crudOptions = options.crudOptions;\r\n    var data;\r\n    switch ($(target).prop('tagName').toLowerCase()) {\r\n        case 'form':\r\n            if (e.type === 'submit') {\r\n                e.preventDefault();\r\n                action = $(target).attr('action') || action;\r\n                type = 'post';\r\n                // @ts-ignore\r\n                data = new FormData(target);\r\n            }\r\n            else {\r\n                return;\r\n            }\r\n            break;\r\n        case 'a':\r\n        case 'button':\r\n            if (e.type === 'click') {\r\n                e.preventDefault();\r\n                action = $(target).attr('href') || action;\r\n                type = $(target).attr('method') || type || 'get';\r\n                data = eval('(' + $(target).attr('params') + ')' || false);\r\n            }\r\n            else {\r\n                return;\r\n            }\r\n            break;\r\n    }\r\n    var confirmPromise = $.Deferred();\r\n    if (preConfirm) {\r\n        preConfirm(target, data).then(confirmPromise.resolve, confirmPromise.reject);\r\n    }\r\n    else {\r\n        confirmPromise.resolve();\r\n    }\r\n    confirmPromise.promise().then(function () {\r\n        $crud.send(__assign({ checkDataType: false, notify: false }, crudOptions, { url: action, method: type, data: data })).then(function (data) {\r\n            $(target).trigger('aftersubmit', [data]);\r\n        });\r\n    });\r\n});\r\n//# sourceMappingURL=index.js.map\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = jQuery;\n\n//# sourceURL=webpack:///external_%22jQuery%22?");

/***/ }),

/***/ "lodash":
/*!********************!*\
  !*** external "_" ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = _;\n\n//# sourceURL=webpack:///external_%22_%22?");

/***/ })

/******/ });