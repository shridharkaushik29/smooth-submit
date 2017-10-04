# smooth-submit
This is a great library to prevent page loads in form submiting in html5


Just add smooth-submit class to form tag and see the magic

<b>Forms</b>

<code>
$('form').on('aftersubmit', function(e,data){
    //here data variable holds the response from the server
})
</code>

When user submits the form, an ajax request is sent to the url specified in the action attribute of the form tag. The library is smart enough to encapsulate the form data with the ajax request exactly like native behaviour of html5 forms, so you don't have to do any changes to your server side code.

When the server sends back some response, an event is triggered on the same form element (see above code). Now if you have attached an event handler to the form, then you can get the response text in the second argument of the event handler function.