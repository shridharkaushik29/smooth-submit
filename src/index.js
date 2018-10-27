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
Object.defineProperty(exports, "__esModule", { value: true });
var $ = require("jquery");
$(document).on('submit click', '.smooth-submit', function (e) {
    e.preventDefault();
    // @ts-ignore
    var target = e.currentTarget;
    var options = __assign({}, target.smoothSubmitOptions);
    var ajaxSettings = {};
    var action = options.action, type = options.type, preConfirm = options.preConfirm;
    var data;
    switch ($(target).prop('tagName').toLowerCase()) {
        case 'form':
            action = $(target).attr('action') || action;
            type = $(target).attr('method') || type;
            // @ts-ignore
            data = new FormData(target);
            ajaxSettings.cache = false;
            ajaxSettings.processData = false;
            ajaxSettings.contentType = false;
            break;
        case 'a':
        case 'button':
            action = $(target).attr('href') || action;
            type = $(target).attr('method') || type;
            break;
    }
    ajaxSettings.url = action;
    ajaxSettings.type = type;
    ajaxSettings.data = data;
    var confirmPromise = $.Deferred();
    if (preConfirm) {
        preConfirm(target, data).then(confirmPromise.resolve, confirmPromise.reject);
    }
    else {
        confirmPromise.resolve();
    }
    confirmPromise.promise().then(function () {
        ajaxSettings.success = function (data) {
            $(target).trigger('aftersubmit', [data]);
        };
        $.ajax(ajaxSettings);
    });
});
$.fn.smoothSubmit = function (options) {
    $.each(this, function () {
        this.smoothSubmitOptions = options;
    });
    return this;
};
//# sourceMappingURL=index.js.map