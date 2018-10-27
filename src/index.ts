import * as $ from "jquery";
import AjaxSettings = JQuery.AjaxSettings;
import {CrudRequest} from "crud-sk";
import {RequestOptions} from "crud-sk/src";

declare global {

    interface JQuery<TElement = HTMLElement> {
        smoothSubmit(options: SmoothSubmitOptions): JQuery<TElement>;
    }

    interface JQueryStatic {
        crud(): CrudRequest
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

jQuery.crud = () => $crud;

jQuery.fn.smoothSubmit = function (options: SmoothSubmitOptions) {
    $.each(this, function () {
        this.smoothSubmitOptions = options;
    });
    return this;
}

$(document).on('submit click', '.smooth-submit', function (e) {
    e.preventDefault();
    // @ts-ignore
    const target = <Element> e.currentTarget;
    const options = {
        ...target.smoothSubmitOptions
    }

    let {action, type, preConfirm, crudOptions} = options;
    let data: FormData | Object;

    switch ($(target).prop('tagName').toLowerCase()) {
        case 'form':
            action = $(target).attr('action') || action
            type = 'post'
            // @ts-ignore
            data = new FormData(target);
            break;

        case 'a':
        case 'button':
            action = $(target).attr('href') || action
            type = $(target).attr('method') || type
            data = eval($(target).attr('params') || null);
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