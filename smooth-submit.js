(function () {

    function send(settings) {

        return new Promise(function (success, error) {
            settings.success = success;
            settings.error = error;
            $.ajax(settings);
        })

    }

    function recieved(target, data) {
        $(target).trigger('aftersubmit', [data]);
    }

    $(document).on('submit', 'form.smooth-submit', function (e) {
        e.preventDefault();
        var target = this;
        var options = target.smoothSubmitOptions || {};
        send({
            type: "POST",
            url: $(target).attr('action') || options.action,
            data: new FormData(target),
            cache: false,
            processData: false,
            contentType: false,
        }).then(function (data) {
            recieved(target, data);
        });
    }).on('click', 'a.smooth-submit', function (e) {
        e.preventDefault();
        var target = this;
        var options = target.smoothSubmitOptions || {};
        (new Promise(function (resolve, reject) {
            if (options.preConfirm) {
                options.preConfirm().then(resolve, reject);
            } else {
                resolve();
            }
        })).then(function () {
            send({
                data: options.data,
                type: options.type,
                url: $(target).attr('href'),
            }).then(function (data) {
                recieved(target, data);
            });
        })
    })

    $.fn.smoothSubmit = function (options) {
        $.each(this, function () {
            this.smoothSubmitOptions = options;
        });
        return this;
    }

})()