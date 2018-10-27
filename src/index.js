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
var crud_sk_1 = require("crud-sk");
var $crud = new crud_sk_1.CrudRequest();
jQuery.crud = function () { return $crud; };
jQuery.fn.smoothSubmit = function (options) {
    $.each(this, function () {
        this.smoothSubmitOptions = options;
    });
    return this;
};
$(document).on('submit click', '.smooth-submit', function (e) {
    e.preventDefault();
    // @ts-ignore
    var target = e.currentTarget;
    var options = __assign({}, target.smoothSubmitOptions);
    var action = options.action, type = options.type, preConfirm = options.preConfirm, crudOptions = options.crudOptions;
    var data;
    switch ($(target).prop('tagName').toLowerCase()) {
        case 'form':
            action = $(target).attr('action') || action;
            type = 'post';
            // @ts-ignore
            data = new FormData(target);
            break;
        case 'a':
        case 'button':
            action = $(target).attr('href') || action;
            type = $(target).attr('method') || type;
            data = eval($(target).attr('params') || null);
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
$(document).on('click', '.choose-file', function (e) {
    // @ts-ignore
    var currentTarget = e.currentTarget;
    var attributes = currentTarget.attributes;
    // @ts-ignore
    $.crud().chooseFile({
        multiple: eval(attributes.multiple),
    });
    // $(currentTarget).trigger('filechoosen', [file]);
});
//# sourceMappingURL=index.js.map