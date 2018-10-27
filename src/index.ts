import * as $ from "jquery";
import AjaxSettings = JQuery.AjaxSettings;

declare global {

    interface JQuery<TElement = HTMLElement> {
        smoothSubmit(options: SmoothSubmitOptions): JQuery<TElement>;
    }

    interface Element {
        smoothSubmitOptions: SmoothSubmitOptions
    }
}


export interface SmoothSubmitOptions {
    action?: string,
    type?: "get" | "post" | string,
    preConfirm?: (target: Element, data: FormData | Object) => Promise<any>,
}

$(document).on('submit click', '.smooth-submit', function (e) {
    e.preventDefault();
    // @ts-ignore
    const target = <Element> e.currentTarget;
    const options = {
        ...target.smoothSubmitOptions
    }

    const ajaxSettings: AjaxSettings = {}

    let {action, type, preConfirm} = options;
    let data: FormData | Object;

    switch ($(target).prop('tagName').toLowerCase()) {
        case 'form':
            action = $(target).attr('action') || action
            type = $(target).attr('method') || type
            // @ts-ignore
            data = new FormData(target);
            ajaxSettings.cache = false;
            ajaxSettings.processData = false;
            ajaxSettings.contentType = false;
            break;

        case 'a':
        case 'button':
            action = $(target).attr('href') || action
            type = $(target).attr('method') || type
            break;

    }

    ajaxSettings.url = action;
    ajaxSettings.type = type;
    ajaxSettings.data = data;

    const confirmPromise = $.Deferred();

    if (preConfirm) {
        preConfirm(target, data).then(confirmPromise.resolve, confirmPromise.reject)
    } else {
        confirmPromise.resolve();
    }

    confirmPromise.promise().then(() => {
        ajaxSettings.success = data => {
            $(target).trigger('aftersubmit', [data]);
        }
        $.ajax(ajaxSettings);
    })
})

$.fn.smoothSubmit = function (options: SmoothSubmitOptions) {
    $.each(this, function () {
        this.smoothSubmitOptions = options;
    });
    return this;
}
