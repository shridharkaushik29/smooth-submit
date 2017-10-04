$(document).on('submit', 'form.smooth-submit', function (e) {
    e.preventDefault();
    send({
        element: this,
        url: $(this).attr('action'),
        data: new FormData(this),
        cache: false,
        processData: false,
        contentType: false,
    });
}).on('click', 'a.smooth-submit', function (e) {
    e.preventDefault();
    var element = this;
    if ((this.dataset || {}).confirm) {
        swal({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(function () {
            send({
                element: element,
                url: $(element).attr('href'),
            });
        })
    } else {
        send({
            element: element,
            url: $(element).attr('href'),
        });
    }
}).on('aftersubmit', '.load-modal', function (e, data) {
    if (data.content) {
        updateModal(data.content);
        var modal = "#modal-lg";
        window.history.pushState({modal: modal, url: $(this).attr('href')}, null, null);
        $(modal).modal('show');
    } else {
        malert(data.messege, data);
    }
}).on('click', "a.load-page", function (e) {
    if ($(this).attr('href') == window.location.href || $('base').attr('href') + $(this).attr('href') == window.location.href) {
        var redirect = true;
    } else {
        var redirect = false;
    }
    change_page($(this).attr('href'), redirect);
    return false;
}).on('shown.bs.modal', '#modal-lg', function () {
    if (window.google) {
//        initMap();
    }
});

window.onpopstate = function (e) {
    if ((e.state || {}).url) {
        getContent(e.state.url, function (data) {
            updateModal(data.content);
            $("#modal-lg").modal('show');
        }, 'json');
    } else {
        if (($("#modal-lg").data('bs.modal') || {}).isShown) {
            $('.modal').modal('hide');
            window.modalClosed = false;
        } else {
            if (window.preventRefresh !== true) {
                getContent(window.location, changeContent, 'html', e.state);
            } else {
                window.preventRefresh = false;
            }
        }
    }
}

function change_page(url, replace) {
    getContent(url, changeContent, 'html');
    if (replace !== true) {
        window.history.pushState({}, null, url);
    } else {
        window.history.replaceState({}, null, url);
    }
}


function send(options) {

    var settings = {
        type: "POST",
        dataType: 'json',
        data: {},
        beforeSend: function () {
            $('#loading-box').modal('show');
        },
        success: function (data, xhr) {
            var element = options.element;
            eval(data.script);
            $(element).trigger('aftersubmit', [data, this]);
            $('#loading-box').modal('hide');
        },
        error: function (error) {
            $('#loading-box').modal('hide');
            if (window.swal) {
                if (error.status != 0) {
                    swal({
                        title: error.status + ': ' + error.statusText,
                        type: 'error',
                        html: "<iframe class='window' srcdoc='" + error.responseText + "'></iframe>"
                    });
                } else {
                    swal("No Internet", "You're not connected to internet right now.", 'error').then(function () {
                        console.log('closed');
                        navigator.app.exitApp();
                    });
                }

            } else {
                malert(error.status + ': ' + error.statusText);
            }
            console.log(error);
        }
    }

    settings = $.extend(settings, options);

    $.ajax(settings);
}

function getContent(url, callback, type, state) {
    window.history.replaceState({scroll: $(window).scrollTop()}, null, window.location);
    $('#loading-box').modal('show');
    $.ajax({
        url: url || window.location,
        data: {},
        type: 'POST',
        dataType: type || 'html',
        success: function (data) {
            if (callback) {
                callback(data, state);
                $('#loading-box').modal('hide');
            } else {
                changeContent(data);
            }
        }
    });
}

function changeContent(data, state) {
    $('title').text($(data).filter('title').text());
    $('#wraper').fadeTo(300, 0, function () {

        $(this).html($(data).filter('#wraper').html());
//        $(window).scrollTop((state || {}).scroll || 0);
        $(window).scrollTop(0);
        $('[name=search]').val($(data).find('[name=search]').val()).blur();
        $('.user-box').html($(data).filter('.user-box').html());
        $('.open').removeClass("open");

        $(this).fadeTo(300, 1, function () {
            $('.modal').modal('hide');
        });
    });
}

function updateModal(content) {
    $("#modal-lg .modal-content").html(content).find('input');
}

function malert(messege, data) {

    var data = data || {};

    if ($.notify) {
        var animateIn = data.animation || 'animated bounceIn';
        $.notify({
            message: messege || 'Action Completed Successfully',
            icon: data.icon || 'fa fa-info'
        }, {
            type: data.type || 'danger',
            z_index: '1060',
            placement: {
                from: 'top',
                align: 'center',
            },
            animate: {
                enter: 'animated ' + animateIn,
                exit: 'animated fadeOutRight'
            },
            delay: data.delay || 0,
            mouse_over: 'pause'
        });
    } else {
        alert(data.messege);
    }
}

$.fn.refresh = function (data) {
    var element = this;
    if (!data) {
        $.get(window.location, {}, function (data) {
            afterRefresh(element, data);
        });
    } else {
        afterRefresh(element, data);
    }
}

function afterRefresh(element, data) {
    $(element).each(function () {
        if ($(this).attr('id').length > 0) {
            var id = "#" + $(this).attr('id');
        } else {
            var id = $(this).attr('data-selector');
        }
        $(id).html($(data).find(id).html());
    });
}