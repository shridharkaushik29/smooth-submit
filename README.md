# smooth-submit
This is a great library to prevent page loads in forms and links in HTML5.


Just add smooth-submit class to `<form>`, `<a>` or `<button>` tag and see the magic

<p>
When user submits the form or clicks a link, an ajax request is sent to the url specified in the action attribute of the form tag. The library is smart enough to encapsulate the form data with the ajax request exactly like native behaviour of html5 forms, so you don't have to do any changes to your server side code.
</p>

<p>
When the server sends back some response, an event is triggered on the same form element (see above code). Now if you have attached an event handler to the form, then you can get the response text in the second argument of the event handler function.
</p>

<h3>Installation</h3>

<b>via NPM</b>

<code>`$ npm install smooth-submit`</code>

<b>via Bower</b>

<code>`$ bower install smooth-submit`</code>

<h3>Usage</h3>

<b>Mannually</b>
<pre>
&lt;script src="path/to/jquery.min.js">&lt;/script>
&lt;script src="path/to/smooth-submit.min.js">&lt;/script>
</pre>

<b>with Webpack</b>

<code>require('smooth-submit')</code>

<b>with Typescript</b>

<p>This package is writtern in typescript, hence includes all the definitions required for typescript</p>

<code>import {SmoothSubmitOptions} from 'smooth-submit'</code>

<b>in HTML</b>

<pre>
    $('form, a, button').smoothSubmit({
    //preConfirm should return a Promise to continue or cancel
        preConfirm: function (element, data) {
            return new Promise(function (resolve, reject) {
                //Here you can check the form data and call resolve() to continue submitssion and reject() to cancel submission
            })
        }
    }).on('aftersubmit', function (e, data) {
        alert(JSON.stringify(data))
    })
</pre>