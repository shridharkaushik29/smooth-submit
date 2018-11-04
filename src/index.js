"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var $ = require("jquery");
var crud_sk_1 = require("crud-sk");
var $crud = new crud_sk_1.CrudRequest();
var defaultOptions = {};
jQuery.crud = function () { return $crud; };
jQuery.smoothSubmitConfig = function (options) {
    defaultOptions = options;
    return _this;
};
jQuery.fn.smoothSubmit = function (options) {
    $.each(this, function () {
        this.smoothSubmitOptions = options;
    });
    return this;
};
$(document).on('submit click', '.smooth-submit', function (e) {
    // @ts-ignore
    var target = e.currentTarget;
    var options = __assign({}, defaultOptions, target.smoothSubmitOptions);
    var action = options.action, type = options.type, preConfirm = options.preConfirm, crudOptions = options.crudOptions;
    var data;
    switch ($(target).prop('tagName').toLowerCase()) {
        case 'form':
            if (e.type === 'submit') {
                e.preventDefault();
                action = $(target).attr('action') || action;
                type = 'post';
                // @ts-ignore
                data = new FormData(target);
            }
            else {
                return;
            }
            break;
        case 'a':
        case 'button':
            if (e.type === 'click') {
                e.preventDefault();
                action = $(target).attr('href') || action;
                type = $(target).attr('method') || type || 'get';
                data = eval('(' + $(target).attr('params') + ')' || null);
            }
            else {
                return;
            }
            break;
    }
    var confirmPromise = $.Deferred();
    if (preConfirm) {
        preConfirm(target, data).then(confirmPromise.resolve, confirmPromise.reject);
    }
    else {
        confirmPromise.resolve();
    }
    confirmPromise.promise().then(function () {
        $crud.send(__assign({ checkDataType: false, notify: false }, crudOptions, { url: action, method: type, data: data })).then(function (data) {
            $(target).trigger('aftersubmit', [data]);
        });
    });
});
//# sourceMappingURL=index.js.map