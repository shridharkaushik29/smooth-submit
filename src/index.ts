import * as $ from "jquery";
import {CrudRequest} from "crud-sk";
import {RequestOptions} from "crud-sk/src";

declare global {

    interface JQuery<TElement = HTMLElement> {
        smoothSubmit(options: SmoothSubmitOptions): JQuery<TElement>;
    }

    interface JQueryStatic {
        crud(): CrudRequest,

        smoothSubmitConfig: (config: SmoothSubmitOptions) => this
    }

    interface Element {
        smoothSubmitOptions: SmoothSubmitOptions
    }
}

export interface SmoothSubmitOptions {
    action?: string,
    type?: "get" | "post" | string,
    preConfirm?: (target: Element, data: FormData | Object) => Promise<any>,
    crudOptions?: RequestOptions
}

const $crud = new CrudRequest();

let defaultOptions: SmoothSubmitOptions = {}

jQuery.crud = () => $crud;

jQuery.smoothSubmitConfig = (options: SmoothSubmitOptions) => {
    defaultOptions = options;
    return this;
}

jQuery.fn.smoothSubmit = function (options: SmoothSubmitOptions) {
    $.each(this, function () {
        this.smoothSubmitOptions = options;
    });
    return this;
}

$(document).on('submit click', '.smooth-submit', function (e) {
    // @ts-ignore
    const target = <Element> e.currentTarget;
    const options = {
        ...defaultOptions,
        ...target.smoothSubmitOptions
    }

    let {action, type, preConfirm, crudOptions} = options;
    let data: FormData | Object;

    switch ($(target).prop('tagName').toLowerCase()) {
        case 'form':
            if (e.type === 'submit') {
                e.preventDefault();
                action = $(target).attr('action') || action
                type = 'post'
                // @ts-ignore
                data = new FormData(target);
            } else {
                return;
            }
            break;

        case 'a':
        case 'button':
            if (e.type === 'click') {
                e.preventDefault();
                action = $(target).attr('href') || action
                type = $(target).attr('method') || type || 'get'
                data = eval('(' + $(target).attr('params') + ')' || null);
            } else {
                return;
            }
            break;

    }

    const confirmPromise = $.Deferred();

    if (preConfirm) {
        preConfirm(target, data).then(confirmPromise.resolve, confirmPromise.reject)
    } else {
        confirmPromise.resolve();
    }

    confirmPromise.promise().then(() => {
        $crud.send({
            checkDataType: false,
            notify: false,
            ...crudOptions,
            url: action,
            method: type,
            data: data,
        }).then(data => {
            $(target).trigger('aftersubmit', [data]);
        })
    })
})